export class TeamRepository {
    private defaultUrl = "https://pokeapi.co/api/v2/pokemon";

    async makeRequest(url: string) {
        const result = await fetch(url)
            .then(response => {
                if(!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            });

        return result;

    }

    async getTotalPokemonsCount(): Promise<number> {
        const result = await this.makeRequest(this.defaultUrl) as { count: number };

        if(!result.count) {
            throw new Error("Invalid response format");
        }
        
        return result.count;
    }

    async getPokemonUrlById(id: number): Promise<string> {
        //not necessarily the  pokemon id is the `count` of pokenos
        //therefore, we need to use offset and limit to get a specific id
        const result = await this.makeRequest(this.defaultUrl + '?' +new URLSearchParams({
            "offset": `${id - 1}`,
            "limit": "1"
        })) as {
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

        const result = await this.makeRequest(uri) as 
        {
            name: string;
            moves: {
                [move: string]: {
                    name: string,
                    url: string
                }
            }[];
        };  

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