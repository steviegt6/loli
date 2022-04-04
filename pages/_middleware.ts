import { NextRequest, NextResponse } from "next/server";
import { url } from "../components/config";
import { CustomUrl } from "./api/get-url";

const blacklist = ["/"];

const Middleware = async (req: NextRequest) => {
  if (!process.browser) {
    return NextResponse.next();
  }

  if (blacklist.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  var res = await fetch(url + "/api/get-url", {
    body: JSON.stringify({
      shortened: req.nextUrl.pathname.substring(1),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (res.status == 404) {
    return NextResponse.next();
  }

  var custom: CustomUrl = await res.json();

  return NextResponse.redirect(custom.url);
};

export default Middleware;
