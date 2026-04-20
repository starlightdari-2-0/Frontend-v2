// export interface CommentType {
//     id: number;
//     author: string;
//     content: string;
//     date: string;
//     replies?: CommentType[];
// }

export interface CommentType {
    comment_id: number;     // 서버 response 기준
    memory_id: number;
    content: string;
    writer_id?: number;      // 서버 response 기준
    writer_name: string;    // 서버 response 기준
    parent_id?: number | null;
    date?: string;          // 필요시 추가
    replies?: CommentType[]; // 대댓글 배열
    reply_count: number;
    like_count: number;
    like?: boolean;
    mine?: boolean;
}
