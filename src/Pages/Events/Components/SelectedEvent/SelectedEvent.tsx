import EventPoll from '../EventPoll/EventsPoll'
import { Calendar, MapPin, X } from 'lucide-react'
import style from '../../styles/Events.module.css'
import { useAuth } from '@/Context/AuthProvider'
import Example from '@/Components/Carosel/Carosel'
import { useEvents } from '../../Context/EventsContext'
import MapComponent from '../GoogleMap/MapPicker'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const SelectedEventCard = () => {
    const { currentUser } = useAuth()
    const { selectedEvent, setSelectedEvent, setShowEventModal, formatDate } = useEvents()
    const [, setSearchParams] = useSearchParams()

    useEffect(() => {
        console.log('Selected Event:', selectedEvent)
        if (selectedEvent?._id) {
            setSearchParams({ event: selectedEvent._id.toString() })
        } else {
            setSearchParams({})
        }

        return () => {
            setSearchParams({})
        }
    }, [selectedEvent, setSearchParams])

    if (!selectedEvent) {
        return null
    }

    return (
        <div className={style.Wrap}>
            {selectedEvent?.photo && selectedEvent.photo.length > 0 ? <Example images={selectedEvent.photo} /> : ''}
            <div className={style.selectedEvent}>
                <div className={style.flex}>
                    <div className={style.title}>{selectedEvent.title}</div>
                    <X className="cursor-pointer text-slate-500 hover:text-slate-800"
                        onClick={() => {
                            setSelectedEvent(null)
                            setShowEventModal(false)
                        }}
                    />
                </div>
                <div className={style.description}>
                    {selectedEvent.description}
                </div>
                <div className={style.dataContainer}>
                    <div className={style.dateContainer}>
                        <div className={style.data}>
                            <Calendar size={20} className="text-slate-500" />
                            {formatDate(selectedEvent.startDate)} - {formatDate(selectedEvent.endDate)}
                        </div>
                    </div>
                    <div className={style.data}>
                        <MapPin size={20} className="text-slate-500" />
                        <div>{selectedEvent.location}</div>
                    </div>
                </div>
                <div style={{ width: '100%', height: '400px' }}>
                    <MapComponent onLocationChange={(address, lat, lng) =>
                        console.log(address, lat, lng)
                    }
                        savedLocation={selectedEvent.location}
                        showInput={false}
                    />
                </div>
                {selectedEvent.poll && (
                    <EventPoll
                        poll={selectedEvent.poll}
                        eventId={selectedEvent._id}
                        userId={currentUser?._id}
                    />
                )}
            </div>
        </div>
    )
}

export default SelectedEventCard