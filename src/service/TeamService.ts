import { TeamRepository } from "../repository/TeamRepository";

interface Pokemon {
    name: string;
    moves: string[];
}
export class TeamService {
    teamRepository: TeamRepository;
    private pokemonTeamSize = 3;

    constructor(teamRepository?: TeamRepository) {
        this.teamRepository = teamRepository || new TeamRepository();
    }

    private async getTotalPokemonsCount() {
        const count = await this.teamRepository.getTotalPokemonsCount();
        return count;
    }

    private getRandomNumberUnderMax(max: number) {
        return Math.round((Math.random() * max + 1));
    }

    async getPokemonTeam() {
        const maxId = await this.getTotalPokemonsCount();

        let ids: number[] = [];
        for (let i = 0; i < this.pokemonTeamSize; i++) {
            let curId = this.getRandomNumberUnderMax(maxId);
            while(ids.includes(curId)) curId = this.getRandomNumberUnderMax(maxId);
            ids.push(curId);
        }

        return await Promise.all(ids.map(async (id) => {
            const result = await this.teamRepository.getPokemonById(id);
            if(!result) throw new Error("Failed to fetch pokemon");

            const pokemon: Pokemon = {
                name: result.name,
                moves: result.moves.splice(0, 3).map(mv => mv.name)
            }

            return pokemon;
        }));


    }
}