import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {

    const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                    type="greeting"
                    title="Welcome"
                    user={loggedIn.name || "Guest"} 
                    subtext = "Access and manage your bank accounts transactions easily."
                    />

                    <TotalBalanceBox 
                        accounts = {[]}
                        totalBanks = {1}
                        totalCurrentBalance = {1250}
                    />
            </header>

            RECENT TRANSATION

        </div>

        <RightSideBar user={loggedIn} transactions={[]} banks={[{currentBalance : 123.34} , {currentBalance : 407}]}/>
    </section>
  )
}

export default Home