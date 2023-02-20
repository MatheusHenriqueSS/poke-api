import { expect } from "chai";
import api from "../../src/api";
import request from "supertest";
import { Pokemon } from "../../src/service/TeamService";
describe('Api Suite Tests', () => {
    describe('/team', () => {
        it('should return HTTP status 200 when /team is called', async () => {
            const response = await request(api).get('/team');
            expect(response.statusCode).to.be.equal(200);
        })

        it('should return exactly 3 pokemon when /team is called', async () => {
            const response = await request(api).get('/team');
            expect(response.body.length).to.be.equal(3);
        })

        it('should return a name and at maximum 3 moves per pokemon', async() => {
            const response = await request(api).get('/team');
            const team = response.body as Pokemon[];

            team.forEach(pok => {
                expect(pok.name).to.be.string;
                expect(pok.moves.length).to.be.lte(3);
            })

        })
    })

    describe('/', () => {
        it('should return a Hello World in fallback route', async () => {
            const response = await request(api).get('/hello');
            expect(response.text).to.be.equal("Hello World!");
        })
    })
})