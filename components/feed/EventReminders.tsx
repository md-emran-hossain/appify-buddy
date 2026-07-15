import Image from 'next/image';
import { EventReminder } from '@/types';
import Link from 'next/link';


const eventsData: EventReminder[] = [
  {
    id: 1,
    dateDay: "10",
    dateMonth: "Jul",
    title: "No more terrorism no more cry",
    image: "/assets/images/feed_event1.png",
    peopleGoing: 17,
  },
  {
    id: 2,
    dateDay: "10",
    dateMonth: "Jul",
    title: "No more terrorism no more cry",
    image: "/assets/images/feed_event1.png",
    peopleGoing: 17,
  },
];

const EventReminders = () => (
  <div className="card bg-theme-card border-0 mb-3 px-4 pt-4 rounded-3">
    <div className="d-flex align-items-center justify-content-between mb-4">
      <h6 className="fw-semibold mb-0">Events</h6>
      <Link href="#" className="fw-medium text-primary small text-decoration-none">
        See all
      </Link>
    </div>

    {eventsData.map((event) => (
      <div key={event.id}>
        <div className="card border-0 left_inner_event_card rounded-3 overflow-hidden mb-4">
          <Link className="text-decoration-none text-body" href="#">
            <div>
              <Image width={400} height={300}
                src={event.image}
                alt="Event"
                className="img-fluid w-100 d-block"
              />
            </div>
            <div className="d-flex align-items-center py-3">
              <div className="bg-success rounded-1 p-2 text-center text-white">
                <p className="fs-5 fw-bold mb-0 lh-1">{event.dateDay}</p>
                <p className="fs-5 fw-normal mb-0 lh-1">{event.dateMonth}</p>
              </div>
              <h6 className="ms-3 fs-6 fw-medium text-body mb-0">
                {event.title}
              </h6>
            </div>
          </Link>
          <div className="d-flex align-items-center justify-content-between pb-3">
            <p className="text-muted small fw-medium mb-0">
              {event.peopleGoing} People Going
            </p>
            <Link
              href="#"
              className="btn btn-outline-primary btn-sm px-3 py-1 rounded-1 fw-medium text-decoration-none"
            >
              Going
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default EventReminders;
