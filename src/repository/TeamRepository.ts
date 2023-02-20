export class TeamRepository {
    private defaultUrl = "https://pokeapi.co/api/v2/pokemon";

    async getTotalPokemonsCount(): Promise<number> {
        const result = await fetch(this.defaultUrl)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            }) as { count: number };
        
        return result.count;
    }

    private async getPokemonUrlById(id: number): Promise<string> {
        //not necessarily the  pokemon id is the `count` of pokenos
        //therefore, we need to use offset and limit to get a specific id
        const result = await fetch(this.defaultUrl + '?' +new URLSearchParams({
            "offset": `${id - 1}`,
            "limit": "1"
        }))
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json();
            }) as {
                results: [
                    {
                        name: string,
                        url: string
                    }
                ]
            };

        if(!result.results || !result.results.length || !result.results[0].url) {
            throw new Error("Invalid response format while getting pokemon id")
        }
        
        return result.results[0].url;
    }

    async getPokemonById(id: number) {
        const uri = await this.getPokemonUrlById(id);

        if(!uri) throw new Error("Invalid pokemon id");

        const result = await fetch(uri)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }

                return response.json() as unknown as {
                    name: string;
                    moves: {
                        [move: string]: {
                            name: string,
                            url: string
                        }
                    }[];
                };
            });

        return {
            name: result.name,
            moves: result.moves.map(mv => {
                return {
                    name: mv.move.name,
                    url: mv.move.url
                }
            })
        }
    }
}