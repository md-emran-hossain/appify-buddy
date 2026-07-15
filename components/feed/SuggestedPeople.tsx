import Image from 'next/image';
import { SuggestedPerson } from '@/types';
import Link from 'next/link';


const suggestedPeopleData: SuggestedPerson[] = [
	{ id: 1, name: 'Steve Jobs', title: 'CEO of Apple', image: '/assets/images/people1.png' },
	{ id: 2, name: 'Ryan Roslansky', title: 'CEO of Linkedin', image: '/assets/images/people2.png' },
	{ id: 3, name: 'Dylan Field', title: 'CEO of Figma', image: '/assets/images/people3.png' },
];

const SuggestedPeople = () => (
  <div className="card bg-theme-card border-0 mb-3 px-4 pt-4 pb-2 rounded-3">
    <div className="d-flex align-items-center justify-content-between mb-4">
      <h6 className="fw-semibold mb-0">Suggested People</h6>
      <Link className="fw-medium text-primary small text-decoration-none" href="#">See All</Link>
    </div>
    
    {suggestedPeopleData.map((person) => (
      <div key={person.id} className="d-flex align-items-center mb-4">
        <Link href="#" className="me-3 flex-shrink-0">
          <Image width={40} height={40} src={person.image} alt={person.name} className="avatar object-fit-cover" />
        </Link>
        <div className="flex-grow-1">
          <Link href="#" className="text-decoration-none">
            <h6 className="mb-1 text-body small">{person.name}</h6>
          </Link>
          <p className="fw-light mb-0 text-body-secondary" style={{fontSize: '11px'}}>{person.title}</p>
        </div>
        <Link href="#" className="btn btn-outline-secondary btn-sm rounded-1 px-3 py-1 fw-medium flex-shrink-0 ms-2">Connect</Link>
      </div>
    ))}
  </div>
);

export default SuggestedPeople;
