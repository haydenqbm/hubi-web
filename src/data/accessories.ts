import type { Accessory, AccessoryCategory } from "@/types/accessory"

const image = (src: string, alt: string) => ({ src, alt })

export const accessoryCategories: { key: AccessoryCategory; label: string }[] = [
  { key: "mái chèo", label: "Mái chèo" },
  { key: "áo phao", label: "Áo phao" },
  { key: "bơm", label: "Bơm" },
  { key: "khác", label: "Khác" },
]

export const accessories: Accessory[] = [
  {
    slug: "mai-cheo-2-in-1",
    name: "Mái chèo 2 in 1",
    category: "mái chèo",
    price: "315.000₫",
    description: "Mái chèo đa năng, có thể chuyển đổi giữa mái chèo SUP và chèo kayak.",
    images: [image("/images/accessories/paddles/mai-cheo-2-in-1.jpg", "Mái chèo 2 in 1 Hubi")],
  },
  {
    slug: "mai-cheo-nhom",
    name: "Mái chèo nhôm",
    category: "mái chèo",
    price: "275.000₫",
    description: "Mái chèo nhôm nhẹ, phù hợp cho các buổi chèo SUP hằng ngày.",
    images: [image("/images/accessories/paddles/mai-cheo-nhom.jpg", "Mái chèo nhôm Hubi")],
  },
  {
    slug: "cheo-nhom-2-dau",
    name: "Chèo nhôm 2 đầu",
    category: "mái chèo",
    price: "295.000₫",
    description: "Chèo nhôm hai đầu với nhiều lựa chọn màu sắc.",
    images: [image("/images/accessories/paddles/cheo-nhom-2-dau.jpg", "Chèo nhôm 2 đầu Hubi")],
  },

  {
    slug: "ao-phao-hubi-go",
    name: "Áo phao Hubi Go",
    category: "áo phao",
    price: "179.000₫",
    description: "Áo phao cứu hộ thể thao Hubi Go với nhiều màu sắc dễ nhận diện.",
    images: [
      image("/images/accessories/life-jackets/hubi-go.jpg", "Áo phao Hubi Go nhiều màu"),
      image("/images/accessories/life-jackets/hubi-go-1.jpg", "Áo phao Hubi Go phiên bản phối màu"),
      image("/images/accessories/life-jackets/hubi-go-cam.jpg", "Áo phao Hubi Go màu cam"),
      image("/images/accessories/life-jackets/hubi-go-do.jpg", "Áo phao Hubi Go màu đỏ"),
      image("/images/accessories/life-jackets/hubi-go-xanh-nuoc-bien.jpg", "Áo phao Hubi Go màu xanh nước biển"),
      image("/images/accessories/life-jackets/hubi-go-xanh-neon.jpg", "Áo phao Hubi Go màu xanh neon"),
    ],
  },
  {
    slug: "ao-phao-hubipro",
    name: "Áo phao HubiPro",
    category: "áo phao",
    price: "300.000₫",
    description: "Áo phao HubiPro với các phiên bản màu phù hợp cho hoạt động dưới nước.",
    images: [
      image("/images/accessories/life-jackets/hubipro.jpg", "Áo phao HubiPro nhiều màu"),
      image("/images/accessories/life-jackets/hubipro-vang.jpg", "Áo phao HubiPro màu vàng"),
      image("/images/accessories/life-jackets/hubipro-xanh-nuoc-bien.jpg", "Áo phao HubiPro màu xanh nước biển"),
      image("/images/accessories/life-jackets/hubipro-xanh-neon.jpg", "Áo phao HubiPro màu xanh neon"),
      image("/images/accessories/life-jackets/hubipro-do.jpg", "Áo phao HubiPro màu đỏ"),
    ],
  },
  {
    slug: "ao-phao-hubistorm",
    name: "Áo phao Hubistorm",
    category: "áo phao",
    price: "350.000₫",
    description: "Áo phao Hubistorm dáng gọn, phù hợp cho các hoạt động chèo và vui chơi trên nước.",
    images: [image("/images/accessories/life-jackets/hubistorm.jpg", "Áo phao Hubistorm")],
  },
  {
    slug: "ao-phao-hubiaqua",
    name: "Áo phao Hubiaqua",
    category: "áo phao",
    price: "405.000₫",
    description: "Áo phao Hubiaqua với thiết kế màu xanh nổi bật.",
    images: [image("/images/accessories/life-jackets/hubiaqua.jpg", "Áo phao Hubiaqua")],
  },
  {
    slug: "ao-phao-yonsub",
    name: "Áo phao Yonsub",
    category: "áo phao",
    price: "370.000₫",
    description: "Áo phao Yonsub với các phiên bản màu cam và xanh.",
    images: [
      image("/images/accessories/life-jackets/yonsub.jpg", "Áo phao Yonsub nhiều màu"),
      image("/images/accessories/life-jackets/yonsub-cam.jpg", "Áo phao Yonsub màu cam"),
      image("/images/accessories/life-jackets/yonsub-xanh.jpg", "Áo phao Yonsub màu xanh"),
    ],
  },
  {
    slug: "bom-nen-bang-tay",
    name: "Bơm nén bằng tay",
    category: "bơm",
    price: "99.000₫",
    description: "Bơm tay dùng để bơm SUP và các sản phẩm bơm hơi.",
    images: [image("/images/accessories/pumps/bom-nen-bang-tay.jpg", "Bơm nén bằng tay")],
  },
  {
    slug: "stermay-ht677",
    name: "Stermay HT677",
    category: "bơm",
    price: "405.000₫",
    description: "Bơm SUP Stermay HT677 kèm phụ kiện kết nối.",
    images: [image("/images/accessories/pumps/stermay-ht677.jpg", "Bơm SUP Stermay HT677")],
  },
  {
    slug: "stermay-ht790",
    name: "Stermay HT790",
    category: "bơm",
    price: "2.790.000₫",
    description: "Bơm SUP Stermay HT790 với bộ đầu nối và túi đựng.",
    images: [image("/images/accessories/pumps/stermay-ht790.jpg", "Bơm SUP Stermay HT790")],
  },
  {
    slug: "balo-da-nang-sup",
    name: "Balo đa năng dành cho SUP",
    category: "khác",
    price: "99.000₫",
    description: "Balo đựng và mang theo SUP cùng phụ kiện.",
    images: [image("/images/accessories/other/balo-da-nang.jpg", "Balo đa năng dành cho SUP")],
  },
  {
    slug: "bo-sua-chua-sup",
    name: "Bộ sửa chữa SUP",
    category: "khác",
    price: "140.000₫",
    description: "Bộ vật dụng sửa chữa và bảo dưỡng SUP cơ bản.",
    images: [image("/images/accessories/other/bo-sua-chua.jpg", "Bộ sửa chữa SUP")],
  },
  {
    slug: "combo-va-sup",
    name: "Combo vá SUP",
    category: "khác",
    price: "99.000₫",
    description: "Bộ miếng vá và keo sửa chữa SUP.",
    images: [image("/images/accessories/other/combo-va-sup.jpg", "Combo vá SUP")],
  },
  {
    slug: "day-leash",
    name: "Dây Leash",
    category: "khác",
    price: "75.000₫",
    description: "Dây leash giúp kết nối người chèo với SUP trong quá trình sử dụng.",
    images: [image("/images/accessories/other/day-leash.jpg", "Dây Leash SUP")],
  },
  {
    slug: "fin-vay-sup-cao-cap",
    name: "Fin vây SUP cao cấp",
    category: "khác",
    price: "75.000₫",
    description: "Fin thay thế giúp SUP giữ hướng ổn định hơn khi chèo.",
    images: [image("/images/accessories/other/fin-sup.jpg", "Fin vây SUP cao cấp")],
  },
  {
    slug: "ghe-vai-sup-kayak",
    name: "Ghế vải cho SUP/Kayak",
    category: "khác",
    price: "350.000₫",
    description: "Ghế vải gắn trên SUP hoặc kayak cho tư thế ngồi thoải mái hơn.",
    images: [image("/images/accessories/other/ghe-vai.jpg", "Ghế vải cho SUP và Kayak")],
  },
  {
    slug: "tui-kho-naturehike",
    name: "Túi khô kiêm phao bơi Naturehike",
    category: "khác",
    price: "345.000₫",
    description: "Túi khô kiêm phao bơi cho các vật dụng cần bảo vệ khi xuống nước.",
    images: [image("/images/accessories/other/tui-kho-naturehike.jpg", "Túi khô kiêm phao bơi Naturehike")],
  },
]

export function getAccessoryBySlug(slug: string) {
  return accessories.find((accessory) => accessory.slug === slug)
}
