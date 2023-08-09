export default interface ActivityDTO {
    authorName: string;
    authorPhoto: string;
    activityType: "LIKE" | "COMMENT";
    createdDate: string;
    text: string;
}