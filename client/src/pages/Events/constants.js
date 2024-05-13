export const SORT_MAP = {
  "sortTitleA-Z": (a, b) => a.title.localeCompare(b.title),
  "sortTitleZ-A": (a, b) => b.title.localeCompare(a.title),
  "sortDateA-Z": (a, b) => a.event_date.localeCompare(b.event_date),
  "sortDateZ-A": (a, b) => b.event_date.localeCompare(a.event_date),
  "sortOrganizerA-Z": (a, b) => a.organizer.localeCompare(b.organizer),
  "sortOrganizerZ-A": (a, b) => b.organizer.localeCompare(a.organizer),
};

export const SORTING_OPTIONS = [
  {
    value: "sortTitleA-Z",
    text:"title A-Z"
  },
  {
    value: "sortTitleZ-A",
    text:"title Z-A"
  },
  {
    value: "sortDateA-Z",
    text:"event date - nearest"
  },
  {
    value: "sortDateZ-A",
    text:"event date - further"
  },
  {
    value: "sortOrganizerA-Z",
    text:"organizer A-Z"
  },
  {
    value: "sortOrganizerZ-A",
    text:"organizer Z-A"
  },
];
