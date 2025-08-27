import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { showToast } from "../../components/toast/toastSlice";

const HomePage = () => {
    /**
     *
     * redux dispatch
     */
    const dispatch = useDispatch();

    return (
        <>
            HomePage
            <Button onClick={() => {
                dispatch(
                    showToast({
                        message: "Key saved Successfully",
                        type: "success",
                    })
                );
            }}>Click</Button>
        </>
    )
}


export default HomePage;
