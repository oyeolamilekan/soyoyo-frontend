import DashboardContainer from "../../components/DashboardContainer";
import ApiKey from "../../components/icons/ApiKey";

export default function Settings() {
    return (
        <DashboardContainer>
            <>
                <div className='flex justify-between flex-col md:flex-row items-center my-5 px-6'>
                    <h3 className='font-bold'>Settings</h3>
                </div>
                <ApiKey/>      
            </>
        </DashboardContainer>
    )
}
