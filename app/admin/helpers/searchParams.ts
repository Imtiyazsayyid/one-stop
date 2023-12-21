import { NextRequest } from "next/server";

function getSearchParam(request: NextRequest, text: string) {
  return request.nextUrl.searchParams.get(text);
}

export default getSearchParam;
