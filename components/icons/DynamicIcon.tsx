import Accessibility from './Accessibility';
import Calendar from './Calendar';
import CalendarEdit from './CalendarEdit';
import Edit from "./Edit";
import Family from './Family';
import Filter from './Filter';
import Location from './Location';
import Ticket from './Ticket';
import Tips from './Tips';

// Socials 
import Facebook from './Facebook';
import Instagram from './Instagram';
import Twitter from './Twitter';
import Twitch from './Twitch';
import Website from './Website';
import Youtube from './Youtube';

const Components = {
    accessibility: Accessibility,
    calendar: Calendar,
    calendarEdit: CalendarEdit,
    edit: Edit,
    family: Family,
    filter: Filter,
    location: Location,
    ticket: Ticket,
    tips: Tips,

    // Socials
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    twitch: Twitch,
    website: Website,
    youtube: Youtube,
}

const DynamicIcon = ({ type, title = null, large = false, classes="", xl = false }) => {
    if (typeof Components[type] !== 'undefined') {
        const Component = Components[type];
        if (xl) {
            return (
                <>
                    <svg className="icon" viewBox="0 0 95 95">
                        <Component />
                    </svg>
                </>
            )
        }
        if (title) {
            return (
                <>
                    <svg className={large ? `${classes} icon--lg icon` : `${classes} icon` } viewBox="0 0 24 24" aria-label={title}>
                        <Component />
                    </svg>
                </>
            )    
        }
        return (
            <>
                <svg className={large ? `${classes} icon--lg icon` : `${classes} icon` } viewBox="0 0 24 24">
                    <Component />
                </svg>
            </>
        )
    }
    return null
}

export default DynamicIcon