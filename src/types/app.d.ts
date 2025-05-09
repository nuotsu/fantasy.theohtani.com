declare global {
	namespace YF {
		interface ResponseError {
			error: string
		}

		interface Response<T = any> {
			fantasy_content: {
				'xml:lang': string
				'yahoo:uri': string
				time: string
				copyright: string
				refresh_rate: string // number
			} & T
		}

		interface Plural<T> {
			[key: string /* number */]: T
			count: number
		}

		interface Users
			extends Response<{
				users: Plural<{
					user: [
						{ guid: string },
						{
							games: Plural<{
								game: [
									{
										game_key: string
										game_id: string
										name: string
										code: string
										type: string
										url: string
										season: string
										is_registration_over: 0 | 1
										is_game_over: 0 | 1
										is_offseason: 0 | 1
										is_live_draft_lobby_active: 0 | 1
										alternate_start_deadline: string // YYYY-MM-DD
									},
									{
										leagues: Plural<{ league: [League] }>
									},
								]
							}>
						},
					]
				}>
			}> {}

		interface Teams extends Response<any> {}

		interface Standings
			extends Response<{
				league: [
					League,
					{
						standings: [
							{
								teams: Plural<{
									team: [
										TeamData,
										{
											team_stats: {
												coverage_type: string
												season: string
												stats: Array<{
													stat: {
														stat_id: string
														value: string // number
													}
												}>
											}
											team_points: {
												coverage_type: string
												season: string
												total: string // number
											}
										},
										{
											team_standings: {
												rank: string // number
												playoff_seed: string // number
												outcome_totals: {
													wins: string // number
													losses: string // number
													ties: string // number
													percentage: string // number
												}
												games_back: string // number || '-'
											}
										},
									]
								}>
							},
						]
					},
				]
			}> {}

		interface League {
			league_key: string
			league_id: string
			name: string
			url: string
			logo_url: string
			draft_status: string
			num_teams: number
			edit_key: string // YYYY-MM-DD
			weekly_deadline: string
			league_update_timestamp: string
			scoring_type: string
			league_type: string
			renew: string
			renewed: string
			felo_tier: string
			iris_group_chat_id: string
			allow_add_to_dl_extra_pos: number
			is_pro_league: string // number
			is_cash_league: string // number
			current_week: number
			start_week: string // number
			start_date: string // YYYY-MM-DD
			end_week: string // number
			end_date: string // YYYY-MM-DD
			is_plus_league: string // number
			game_code: string
			season: string // number
		}

		type TeamData = [
			{ team_key: string },
			{ team_id: string /* number */ },
			{ name: string },
			{ is_owned_by_current_login: 0 | 1 } | [],
			{ url: string },
			{
				team_logos: Array<{
					team_logo: {
						size: string
						url: string
					}
				}>
			},
			[],
			{ waiver_priority: number },
			[],
			{ number_of_moves: number },
			{ number_of_trades: number },
			{
				roster_adds: {
					coverage_type: string
					coverage_value: number
					value: string // number
				}
			},
			[],
			{ league_scoring_type: string },
			[],
			{ draft_position: number },
			{ has_draft_grade: number } | [],
			[],
			[],
			{
				managers: Array<{
					manager: {
						manager_id: string
						nickname: string
						guid: string
						image_url: string
						felo_score: string // number
						felo_tier: string
					}
				}>
			},
		]
	}
}

export {}
