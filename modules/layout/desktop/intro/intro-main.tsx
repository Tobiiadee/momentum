import React from 'react'
import ThinkPlan from './body/think-plan'
import Solution from './body/solution'
import Features from './body/features'

export default function IntroMain() {
  return (
    <div className='px-6 pt-6 pb-10'>
      <ThinkPlan/>
      <Solution/>
      <Features/>
    </div>
  )
}
