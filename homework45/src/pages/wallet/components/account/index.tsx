import { useSelector } from "react-redux";
import { Panel } from "../../../../shared/components/panel"
import { PanelToolBarStyle, PanelToolBarText } from "../../../../shared/styles/styles"
import { AccountLayout } from "./index.styles"
import type { IUser } from "../../../../store/user";

export const AccountArea = () => {
    const user: IUser = useSelector((state:any) => state.user);

    return (
        <AccountLayout>
            <Panel>
                <PanelToolBarStyle>
                    <PanelToolBarText>Account</PanelToolBarText>
                </PanelToolBarStyle>
                {user && user.data && user.data.startBalance && user?.data?.incomeAmount && user?.data?.expenseAmount ?
                    <>
                        <p>Start balance: {user?.data?.startBalance}</p>
                        <p>Income: {user?.data?.incomeAmount}</p>
                        <p>Expenses: {user?.data?.expenseAmount}</p>
                        <h4>Total: {user?.data?.startBalance + user?.data?.incomeAmount - user?.data?.expenseAmount}</h4>
                    </> : ""}

            </Panel>
        </AccountLayout>
    )
}