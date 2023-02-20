import { TeamRepository } from "../../src/repository/TeamRepository";
import {mocks, urls, mockTeamRepository, ids } from "../mocks/TeamRepository.mock";
import { expect } from "chai";

describe('Should test team repository functions', () => {
    let teamRepository: TeamRepository;
    before(() => {
        teamRepository = mockTeamRepository;
    })

    it('should call the base url through makeRequest', async () => {
        const result = await teamRepository.makeRequest(urls.base);
        const expected = mocks.validPokemons;

        expect(result).to.be.equal(expected);
    })

    it('should return correct url to get specific pokemon', async () => {
        const result = await teamRepository.getPokemonUrlById(ids.pokemon1);
        const expected = urls.pokemon1;

        expect(result).to.be.equal(expected);
    })

    it('should return specific pokemon given an id', async () => {
        const result = await teamRepository.getPokemonById(ids.pokemon1);
        const expected = {
            name: mocks.validPokemon1.name,
            moves: mocks.validPokemon1.moves.map(mv => {
                return {
                    name: mv.move.name,
                    url: mv.move.url
                }
            })
        }

        expect(result).to.be.deep.equal(expected);
    })
})