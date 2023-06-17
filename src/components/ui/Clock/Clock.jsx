import React from 'react'
import "./Clock.css"
import { Box } from '@mui/material'

function Clock() {

    return (

<Box class="clock">
  <Box class="clock__second"></Box>
  <Box class="clock__minute"></Box>
    <Box class="clock__hour"></Box>
  <Box class="clock__axis"></Box>
  {Array(60).fill(true).map((_, i) => <Box component="section" class="clock__indicator" key={i}></Box>)}
</Box>
    )
}

export default Clock