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

		// responses

		type Users = Response<{
			users: Plural<{
				user: [
					{ guid: string },
					{
						games: Plural<{ game: Game }>
					},
				]
			}>
		}>

		type Teams = Response<{
			league: [LeagueInfo, { teams: Plural<{ team: Team }> }]
		}>

		type TeamResponse = Response<{
			team: [TeamInfo]
		}>

		type Standings = Response<{
			league: [LeagueInfo, { standings: [{ teams: Plural<{ team: Team }> }] }]
		}>

		type Scoreboard = Response<{
			league: [
				LeagueInfo,
				{
					scoreboard: {
						[key: string /* number */]: {
							matchups: Plural<{ matchup: Matchup }>
						}
						week: number
					}
				},
			]
		}>

		type StatCategories = Response<{
			game: [
				GameInfo,
				{
					stat_categories: {
						stats: Array<{
							stat: {
								stat_id: number
								name: string
								display_name: string
								sort_order: string // number
								position_types: Array<{ position_type: string }>
							}
						}>
					}
				},
			]
		}>

		type Transactions = Response<{
			league: [
				LeagueInfo,
				{
					transactions: Plural<{
						transaction: Transaction
					}>
				},
			]
		}>

		// objects

		interface LeagueInfo {
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

		type Game = [GameInfo, { leagues: Plural<{ league: [LeagueInfo] }> }]

		interface GameInfo {
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
		}

		type Team = [TeamInfo, TeamStats, TeamStandings]

		type TeamInfo = [
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

		type TeamStats = {
			team_stats: {
				coverage_type: string
				season: string
				stats: Array<{
					stat: {
						stat_id: string // number
						value: string // number
					}
				}>
			}
			team_points: {
				coverage_type: string
				season: string
				total: string // number
			}
		}

		type TeamStandings = {
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
		}

		type Matchup = {
			'0': { teams: Plural<{ team: Team }> }
			week: string // number
			week_start: string // YYYY-MM-DD
			week_end: string // YYYY-MM-DD
			status: string
			is_playoffs: string // number
			is_consolation: string // number
			stat_winners: Array<{
				stat_winner: {
					stat_id: string // number
					winner_team_key?: string
					is_tied?: 0 | 1
				}
			}>
		}

		type TransactionInfo = {
			transaction_key: string
			transaction_id: string // number
			type: 'add/drop' | 'add' | 'drop'
			status: 'successful'
			timestamp: string
		}

		type TransactionPlayers = {
			players: Plural<{
				player: [PlayerInfo, TransactionData]
			}>
		}

		type TransactionData = {
			transaction_data:
				| TransactionAddData
				| TransactionDropData
				| Array<TransactionAddData | TransactionDropData>
		}

		type TransactionAddData = {
			type: 'add'
			source_type: 'teams' | 'freeagents'
			destination_type: 'team' | 'waivers'
			destination_team_key: string
			destination_team_name: string
		}

		type TransactionDropData = {
			type: 'drop'
			source_type: 'teams' | 'freeagents'
			source_team_key: string
			source_team_name: string
			destination_type: 'team' | 'waivers'
		}

		type Transaction = [TransactionInfo, TransactionPlayers]

		type PlayerInfo = [
			{ player_key: string },
			{ player_id: string /* number */ },
			{
				name: {
					full: string
					first: string
					last: string
					ascii_first: string
					ascii_last: string
				}
			},
			{ editorial_team_abbr: string },
			{ display_position: string },
			{ position_type: 'B' | 'P' },
		]
	}
}

export {}
