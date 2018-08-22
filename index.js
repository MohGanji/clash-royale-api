const axios = require("axios");
const Promise = require("bluebird");
const mongo = require("./mongo");
// const loop_module = require('pheebs_loop_module')

const Clan = mongo.model("Clan");
const Member = mongo.model("Member");
const Player = mongo.model("Player");

const BASE_URL = "https://api.clashroyale.com/v1/";
const jwtToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjRkMDQ3ZTFmLWFjNjAtNDZjNy04NmY1LTM5NGI3MDVhMDE3NyIsImlhdCI6MTUzNDkzOTQ0Miwic3ViIjoiZGV2ZWxvcGVyL2VlMzEyNDA1LTc5NjUtNWJkNS1kNzZkLTA3ZGI0YTQ1NjMwMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI1LjEyNS40LjE1OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.0ey5WCeF4Z53q1jFDHCsdnBxrcWoP-uLtMgcgusbnhdYBMZUW69dGSGTy9nuh8a7Dq6xcvpJ_OZMfPHjtr275A";
const clantag = "%238QQGQ9R0";

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    authority: "api.clashroyale.com",
    authorization: `Bearer ${jwtToken}`,
    referer: "https://developer.clashroyale.com/api-docs/index.html",
    accept: "application/json;charset=utf-8,*/*",
    origin: "https://developer.clashroyale.com",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "Access-Control-Allow-Origin": "*"
  }
});

const nomalizeTag = tag => tag.replace("#", "%23");

const getMyClan = async () => {
  return (await request.get(`/clans/${clantag}`)).data;
};

const getMyClanMembers = async () => {
  return (await request.get(`/clans/${clantag}/members`)).data;
};

const getPlayer = async playerTag => {
  return (await request.get(`/players/${playerTag}`)).data;
};

async function run() {
  try {
    const clan = await getMyClan();
    await Clan.create({ ...clan });
    const { items: clanPlayers } = await getMyClanMembers();
    await Promise.map(clanPlayers, async member => {
      await Member.create({ ...member });
      const player = await getPlayer(nomalizeTag(member.tag));
      await Player.create({ ...player });
    });
  } catch (err) {
    console.log("ERROR: ", err.message);
    err.response && console.log("REASON: ", err.response.data.reason);
    err.response && console.log("MESSAGE: ", err.response.data.message);
  }
}

run();
