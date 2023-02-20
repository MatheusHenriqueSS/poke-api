import express, { Request, Response } from "express";
import { TeamService } from "./service/TeamService";

const port = process.env.port || 3000;
const app = express();

app.get("/team", async (req: Request, res: Response) => {
    try {
        const teamService = new TeamService();
        const team = await teamService.getPokemonTeam();

        res.send(team);
    } catch(err) {
        res.status(500).send({
            error: true,
            message: err instanceof Error ? err.message : "An error ocurred"
        })
    }
})

app.get("*", (req: Request, res: Response) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

export default app;