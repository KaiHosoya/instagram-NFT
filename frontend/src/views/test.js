import {React} from "react";

import "./test.css"
import Header from "../components/Header/header";
import IndexCard from "../components/Card/indexCard";

const Test = () => {
  return (
    <div>
      <Header />
      {/* <IndexCard src="https://c.neevacdn.net/image/fetch/s--jOab4b64--/https%3A//cdn.thinglink.me/api/image/479353026285404161/1024/10/scaletowidth/0/0/1/1/false/true%3Fwait%3Dtrue?savepath=true"/> */}
      <IndexCard/>
    </div>
  )
}

export default Test