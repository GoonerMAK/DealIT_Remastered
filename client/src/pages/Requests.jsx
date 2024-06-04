import { useState } from "react"
import Addexchangeproduct from "../components/Addexchangeproduct";
import Addsell from "../components/Addsell";
import Addrent from "../components/Addrent";
import Navbar from "../components/Navbar";
import { useAuthContext } from '../hooks/useAuthContext'

const Requests=()=>{
    const { user } = useAuthContext()
    
}
export default Requests