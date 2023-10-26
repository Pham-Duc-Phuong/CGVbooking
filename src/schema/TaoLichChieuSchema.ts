import {z} from 'zod'

export const TaoLichChieuSchema = z.object({
    maPhim: z.string().nonempty('Vui lòng nhập mã phim'),
    ngayChieuGioChieu: z.string().nonempty('Vui lòng nhập lịch chiếu'),
    maRap: z.string().nonempty('Vui lòng nhập mã rạp'),
    giaVe: z.string().nonempty('Vui lòng nhập giá vé'),
})
export type TaoLichChieuSchemaType = z.infer<typeof TaoLichChieuSchema>