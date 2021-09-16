export class Comment {
    constructor(
        public _id: string,
        public userId: string,
        public postId: string,
        public desc: string,
        public depth: Number,
        public parentId: string
    ) {}
}
