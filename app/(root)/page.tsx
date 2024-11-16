import HeaderBox from '@/components/ui/HeaderBox'
import RightSideBar from '@/components/ui/RightSideBar';
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';
import React from 'react'

const Home = () => {

    const loggedIn = {firstName : "Youssef" , lastName : "Ahkim" , email : "youssefahkim@gmail.com"};

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                    type="greeting"
                    title="Welcome"
                    user={loggedIn.firstName || "Guest"} 
                    subtext = "Access and manage your bank accounts transactions easily."
                    />

                    <TotalBalanceBox 
                        accounts = {[]}
                        totalBanks = {1}
                        totalCurrentBalance = {1250.55}
                    />
            </header>

            RECENT TRANSATION

        </div>

        <RightSideBar user={loggedIn} transactions={[]} banks={[{currentBalance : 123.34} , {currentBalance : 407}]}/>
    </section>
  )
}

export default Home