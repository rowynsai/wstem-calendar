// html list of events for weekly email
function buildDigestHTML(events = []) {
  if (!events.length) {
    return '<p>No upcoming events this week.</p>';
  }

  return `
    <ul style="padding-left: 20px;">
      ${events.map(event => `
        <li style="margin-bottom: 15px;">
          <strong>${event.title}</strong><br/>
          <em>${new Date(event.dateTime).toLocaleString()}</em><br/>
          ${event.location ? `📍 ${event.location}<br/>` : ''}
          ${event.link ? `<a href="${event.link}" target="_blank" rel="noopener noreferrer">More Info</a><br/>` : ''}
          ${event.description ? `<p style="margin: 5px 0;">${event.description}</p>` : ''}
        </li>
      `).join('')}
    </ul>
  `;
}

module.exports = {
  buildDigestHTML,
};
