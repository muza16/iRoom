import React from 'react'
import RoomRow from './RoomRow'
import { roomSorter } from '../helpers/sorter'
import { formatAssetName, dailyBookings, bookingArray } from '../helpers/rooms'
import moment from 'moment'

const isMeetingNow = (bookings) => {
  const hours = [8,9,10,11,12,13,14,15,16,17,18,19,20]
  const hoursWithMinutes = hours.map(hour => {
    return [
      {
        hours: hour,
        minutes: 0
      },
      {
        hours: hour,
        minutes: 15
      },
      {
        hours: hour,
        minutes: 30
      },
      {
        hours: hour,
        minutes: 45
      }
    ]
  })
  hoursWithMinutes.forEach((time, id) => {
    bookings.forEach(booking => {
      const hours = moment(booking.bookingStart).hours() + 3
      const minutes = moment(booking.bookingStart).minutes()
      console.log(time, hours, minutes)
    })
  })
}

const RoomsList = (props) => {
  const date = props.date
  const rooms = props.rooms
  const timings = [8,9,10,11,12,13,14,15,16,17,18,19,20]

  
  return (
    <div className='roomsListWrapper'>
      <div className='roomsListHeader'>
        <p className='roomsListTitle'>Level Eight</p>
      </div>
      <div className='roomsListColTitleWrapper'>
          <div className='roomsListColLeft'>
            Room
          </div>
          <div className='roomsListAssetsLeft'>
            Assets
          </div>
          <div className='roomsListColRight'>
            {
              timings.map(timing => {
                return (
                  <div className='interval' style={{width: `${100/timings.length}%`}}>
                    {timing}
                  </div>
                )
              })
            }
          </div>
      </div>
      {
        rooms.map(room => {
          const assets = room.assets
          const todayBookings = dailyBookings(props.date, room.bookings)
          isMeetingNow(todayBookings)
          return (
            <div className='roomsListColWrapper'>
                <div className='roomNameWrapper'>
                  <p className='roomName'>{room.name}</p>
                </div>
                <div className='roomAssetsWrapper'>
                  {
                    Object.keys(assets)
                    .filter(asset => assets[asset])
                    .map(asset => {
                      return(
                        <p className='assetName'>{formatAssetName(asset)}</p>
                      )
                    })
                  }
                </div>
                <div className='roomsListColRight'>
                  {
                    timings.map(timing => {
                      console.log(todayBookings)
                      return (
                        <div className='interval' style={{width: `${100/timings.length}%`}}>
                          {
                            [0,15,30,45].map(subTiming => {
                              const currentHours = timing
                              const currentMinutes = subTiming
                              console.log(currentHours, currentMinutes)
                              return (
                                <div className='subInterval'>
                                </div>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RoomsList
