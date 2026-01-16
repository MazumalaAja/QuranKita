import { useLoaderData } from "react-router-dom"
import { useSurat } from "../hooks"

export default function AlQuran() {
     const { data } = useSurat()
     // const data = useLoaderData()
     return (
          <>
               {data.map((v, i) => (
                    <div key={i}>
                         <p>{v.nama}</p>
                    </div>
               ))}
          </>
     )
}