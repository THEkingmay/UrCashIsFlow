import ShowInDay from "../components/ShowCash"
import Form from "../components/Form"

export default function Home(){
    console.log('Home rerender')
    return(
        <div className="flex flex-col items-center ">
            <ShowInDay/>
            <Form/>
        </div>
    )
}