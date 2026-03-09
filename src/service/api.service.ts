import catchAsync from "../utils/catchAsync";
import httpsCall from "./httpsCall";

export const getField = catchAsync(async (slug: any) => {
  const data = await httpsCall.get(`/field/${slug}`);
  return data;
});

export const getGame = catchAsync (async(gameId: string) => {
    const response =  await httpsCall.get(`/game/${gameId}`)
    return response;
});
export const verifyScoreKeeperCode = catchAsync(async (code: string) => {
  const response = await httpsCall.post("/scorekeeper/verify", { code });
  return response; // { access, refresh }
});
