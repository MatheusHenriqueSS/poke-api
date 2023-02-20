import sinon from "sinon";
import validTeam from "./valid-team.json";
import validPokemons from "./valid-pokemons.json";
import validPokemon1 from "./valid-pokemon1.json";
import validPokemon2 from "./valid-pokemon2.json";
import validPokemon3 from "./valid-pokemon3.json";
import validPokemonUri1 from "./valid-pokemon-uri1.json";
import validPokemonUri2 from "./valid-pokemon-uri2.json";
import validPokemonUri3 from "./valid-pokemon-uri3.json";
import { TeamRepository } from "../../src/repository/TeamRepository";

export const ids = {
    pokemon1: 69,
    pokemon2: 42,
    pokemon3: 708
}

export const urls = {
    base: 'https://pokeapi.co/api/v2/pokemon',
    pokemon1Uri: 'https://pokeapi.co/api/v2/pokemon?offset=68&limit=1',
    pokemon2Uri: 'https://pokeapi.co/api/v2/pokemon?offset=41&limit=1',
    pokemon3Uri: 'https://pokeapi.co/api/v2/pokemon?offset=707&limit=1',
    pokemon1: "https://pokeapi.co/api/v2/pokemon/69/",
    pokemon2: "https://pokeapi.co/api/v2/pokemon/42/",
    pokemon3: "https://pokeapi.co/api/v2/pokemon/708/"

}

export const mocks = {
    validTeam,
    validPokemons,
    validPokemon1,
    validPokemon2,
    validPokemon3,
    validPokemonUri1,
    validPokemonUri2,
    validPokemonUri3
}

export const mockTeamRepository = new TeamRepository();

const stub = sinon.stub(mockTeamRepository, 'makeRequest');

stub.withArgs(urls.base).resolves(validPokemons);
stub.withArgs(urls.pokemon1Uri).resolves(validPokemonUri1);
stub.withArgs(urls.pokemon2Uri).resolves(validPokemonUri2);
stub.withArgs(urls.pokemon3Uri).resolves(validPokemonUri3);
stub.withArgs(urls.pokemon1).resolves(validPokemon1);
stub.withArgs(urls.pokemon2).resolves(validPokemon2);
stub.withArgs(urls.pokemon3).resolves(validPokemon3);

export default {
    urls,
    mocks,
    mockTeamRepository
}