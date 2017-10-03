export default function shortenName(name: string): string {
  return name.replace(" campground and picnic area", "")
    .replace(" large group campground", "")
    .replace(" campgrounds", "")
    .replace(" campground", "")
    .replace(" camping grounds", "")
    .replace(" camping ground", "")
    .replace(" picnic and camping area", "")
    .replace(" camping and picnic area", "")
    .replace(" Camping Area", "")
    .replace(" camping area", "")
    .replace(" rest area", "")
    .replace(" tourist park", "")
    .replace(" Tourist Park - caravan park", "")
    .replace(" campervan and camper trailer area", "")
}
