import { TeamRepository } from "../repository/TeamRepository";

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

        const ids: number[] = [];
        for (let i = 0; i < this.pokemonTeamSize; i++) {
            let curId = this.getRandomNumberUnderMax(maxId);
            while(ids.includes(curId)) curId = this.getRandomNumberUnderMax(maxId);
            ids.push(curId);
        }

        return await Promise.all(ids.map(async (id) => {
            const pokemon = await this.teamRepository.getPokemonById(id);
            if(!pokemon) throw new Error("Failed to fetch pokemon");
            pokemon.moves = pokemon.moves.splice(0, 3);
            return pokemon;
        }));


    }
}