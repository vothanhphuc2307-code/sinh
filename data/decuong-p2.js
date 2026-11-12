window.DECUONG_P2 = [
  {
    id: "dc-p2-1",
    num: 1,
    label: "Câu 1 (gốc Câu 63)",
    prompt: "Hình bên dưới mô tả cấu trúc của một vật chất di truyền ở sinh vật. Các nhận định dưới đây là Đúng hay Sai?",
    quote: null,
    image: {
      src: "images/img_05.jpg",
      caption: "Hình câu 1: Sơ đồ cấu trúc phân tử DNA"
    },
    statements: [
      {
        key: "a",
        text: "[I], [II] là hai mạch đơn của DNA.",
        answer: true,
        explain: "Trên hình vẽ bên trái, kí hiệu [I] (mạch có chiều 5' -> 3' từ trên xuống) và [II] (mạch có chiều 3' -> 5' từ trên xuống) chỉ hai chuỗi polynucleotide (hai mạch đơn) xoắn kép song song và ngược chiều nhau quanh một trục tưởng tượng."
      },
      {
        key: "b",
        text: "Vùng [III] minh họa một đơn phân của DNA, trong đó Cytosin liên kết bổ sung với Guanin bằng ba liên kết hiđrô.",
        answer: true,
        explain: "Khung nét đứt màu xanh [III] bao quanh trọn vẹn 1 đơn phân nucleotide (gồm nhóm phosphate P màu vàng, đường 5C deoxyribose hình ngũ giác và nitrogenous base Cytosine - C); đồng thời trên hình, base C liên kết bổ sung với base G ở mạch đối diện bằng 3 liên kết hydrogen (kí hiệu số 4, trong khi cặp A–T ở vị trí số 3 có 2 liên kết hydrogen)."
      },
      {
        key: "c",
        text: "Liên kết đánh dấu (2) không phải là liên kết phosphodieste giữa các nucleotide trên cùng một mạch, mà là liên kết hiđrô giữa hai mạch bổ sung.",
        answer: false,
        explain: "Nhìn trên hình phóng to, kí hiệu số (2) (cũng như số 1 ở mạch bên phải) chỉ vào liên kết hóa học nối giữa đường deoxyribose của nucleotide phía trên với nhóm phosphate (P) của nucleotide kế tiếp trên cùng một mạch đơn -> Đây chính là liên kết cộng hóa trị PHOSPHODIESTER bền vững; còn liên kết hydrogen giữa hai mạch bổ sung phải là vị trí số (3) và số (4)."
      },
      {
        key: "d",
        text: "Phân tử DNA có cấu trúc đa phân, đơn phân là nucleotide, mỗi nucleotide gồm đường, nhóm phosphate và bazơ nitơ.",
        answer: true,
        explain: "DNA là đại phân tử sinh học được cấu tạo theo nguyên tắc đa phân, đơn phân là 4 loại nucleotide (A, T, G, C); mỗi nucleotide luôn gồm 3 thành phần: 1 gốc đường deoxyribose (C5H10O4), 1 nhóm phosphate (PO4 3-) và 1 base nitơ (A, T, G hoặc C)."
      }
    ]
  },
  {
    id: "dc-p2-2",
    num: 2,
    label: "Câu 2 (gốc Câu 64)",
    prompt: "Dưới đây là sơ đồ gene điều hòa và operon lac. Quan sát sơ đồ và cho biết đâu là kết luận đúng, đâu là kết luận sai.",
    quote: null,
    image: {
      src: "images/img_04.jpg",
      caption: "Hình câu 2: Sơ đồ cấu trúc gen điều hòa và Operon Lac"
    },
    statements: [
      {
        key: "a",
        text: "Gen I không trực tiếp thuộc operon lac nhưng có vai trò điều hòa hoạt động phiên mã của các gen cấu trúc.",
        answer: true,
        explain: "Quan sát dấu ngoặc trên sơ đồ: Gene điều hòa lacI (gồm vùng PI và vùng mã hóa I màu vàng) nằm tách biệt bên ngoài Operon lac; tuy không thuộc operon nhưng gene I tổng hợp protein ức chế có vai trò kiểm soát (điều hòa) sự phiên mã của cụm gene cấu trúc Z, Y, A."
      },
      {
        key: "b",
        text: "Vùng Plac là nơi RNA polymerase bám vào để khởi đầu phiên mã các gen cấu trúc.",
        answer: true,
        explain: "Trên hình vẽ, vùng Plac (Promoter - vùng khởi động màu đỏ) là nơi phân tử enzyme RNA polymerase (hình tam giác màu tím) bám vào để khởi động quá trình phiên mã nhóm gene cấu trúc Z, Y, A."
      },
      {
        key: "c",
        text: "Trình tự O (vùng vận hành) là nơi protein ức chế gắn vào để ngăn cản hoạt động của RNA polymerase.",
        answer: true,
        explain: "Vùng O (Operator - màu xanh dương) nằm ngay giữa vùng khởi động Plac và các gene cấu trúc; khi môi trường không có lactose, protein ức chế gắn đặc hiệu vào vùng O làm cản trở đường trượt của enzyme RNA polymerase."
      },
      {
        key: "d",
        text: "Các gen lacZ, lacY, lacA không điều hòa, mà là gen cấu trúc, mã hóa enzyme tham gia phân giải đường lactozo.",
        answer: true,
        explain: "Ba gene Z, Y, A (màu xanh lá) là các gene cấu trúc mang thông tin mã hóa 3 loại enzyme tương ứng (beta-galactosidase, permease, transacetylase) giúp vi khuẩn vận chuyển và phân giải đường lactose trong môi trường."
      }
    ]
  },
  {
    id: "dc-p2-3",
    num: 3,
    label: "Câu 3 (gốc Câu 65)",
    prompt: "Hình bên mô tả cấu trúc một operon và gene điều hòa ở một chủng vi khuẩn. Dựa vào hình và kiến thức về điều hòa biểu hiện gene, hãy xác định mỗi phát biểu sau đây là Đúng hay Sai.",
    quote: null,
    image: {
      src: "images/img_06.jpg",
      caption: "Hình câu 3: Mô hình operon chứa 4 gen cấu trúc A, B, C, D"
    },
    statements: [
      {
        key: "a",
        text: "Gene điều hòa nằm ngoài operon và không thuộc nhóm gene cấu trúc A, B, C, D.",
        answer: true,
        explain: "Nhìn dấu ngoặc móc trên sơ đồ, cấu trúc của Operon chỉ bao gồm: Vùng Promotor, vùng Operator và Nhóm gene cấu trúc (A, B, C, D); còn Gene điều hòa nằm ở phía trước và tách biệt hoàn toàn khỏi Operon."
      },
      {
        key: "b",
        text: "Vùng operator là vị trí enzyme RNA polymerase bám vào để khởi đầu dịch mã các gene cấu trúc.",
        answer: false,
        explain: "Phát biểu này sai ở 2 điểm cốt lõi: (1) Vị trí để enzyme RNA polymerase bám vào là vùng PROMOTOR (vùng khởi động), còn vùng Operator là nơi bám của protein ức chế; (2) Enzyme RNA polymerase thực hiện quá trình PHIÊN MÃ tổng hợp mRNA chứ không phải dịch mã."
      },
      {
        key: "c",
        text: "Bốn gene cấu trúc A, B, C, D trong hình được phiên mã tạo thành một phân tử mRNA chung.",
        answer: true,
        explain: "Quan sát mũi tên 'Phiên mã' trên sơ đồ: Cả 4 gene cấu trúc A, B, C, D thuộc cùng một operon được phiên mã đồng thời tạo ra MỘT phân tử mRNA chung duy nhất (mRNA đa cistron đặc trưng của sinh vật nhân sơ), sau đó mới dịch mã thành 4 chuỗi protein A, B, C, D."
      },
      {
        key: "d",
        text: "Mỗi gene cấu trúc A, B, C, D đều có vùng promoter riêng và được phiên mã độc lập để tạo ra một phân tử mRNA tương ứng.",
        answer: false,
        explain: "Trên sơ đồ, cả 4 gene cấu trúc A, B, C, D không hề có promoter riêng mà chịu sự kiểm soát chung của một vùng Promotor và một vùng Operator duy nhất ở đầu operon, phiên mã chung ra 1 phân tử mRNA."
      }
    ]
  },
  {
    id: "dc-p2-4",
    num: 4,
    label: "Câu 4 (gốc Câu 66)",
    prompt: "Hình bên mô tả một đoạn phân tử DNA đang thực hiện quá trình tái bản. Dựa vào hình và kiến thức đã học, hãy xác định các phát biểu sau là Đúng hay Sai.",
    quote: null,
    image: {
      src: "images/img_07.jpg",
      caption: "Hình câu 4: Sơ đồ chi tiết cấu trúc nucleotide và tái bản DNA"
    },
    statements: [
      {
        key: "a",
        text: "Phân tử W là một nucleotide, trong đó X là nhóm phosphate, Y là đường deoxyribose và adenine là một nitrogenous base.",
        answer: true,
        explain: "Quan sát hình tròn phóng to 'Phân tử W': Đây là một đơn phân nucleotide của DNA đang được lắp vào mạch mới, gồm hình tròn X là nhóm phosphate, hình ngũ giác Y là đường 5C deoxyribose và khung chữ nhật gắn bên cạnh là base nitơ Adenine (A)."
      },
      {
        key: "b",
        text: "Kí hiệu Z trong hình biểu thị liên kết cộng hóa trị nối các nucleotide liên tiếp trên cùng một mạch DNA.",
        answer: false,
        explain: "Nhìn trên sơ đồ, đường chỉ của kí hiệu Z trỏ trực tiếp vào 3 vạch chấm nối giữa hai 'Nitrogenous base' đối diện nhau trên hai mạch đơn của DNA -> Kí hiệu Z biểu thị LIÊN KẾT HYDROGEN giữa hai mạch theo nguyên tắc bổ sung (không phải liên kết cộng hóa trị phosphodiester trên cùng một mạch)."
      },
      {
        key: "c",
        text: "Theo nguyên tắc bổ sung, nucleotide tại vị trí V trên mạch DNA là nucleotide loại thymine (T).",
        answer: true,
        explain: "Trên hình vẽ, nucleotide tại vị trí V nằm trên mạch khuôn đối diện và liên kết bổ sung bằng 2 vạch chấm (2 liên kết hydrogen) với Phân tử W (nucleotide loại Adenine) -> Theo nguyên tắc bổ sung (A liên kết với T bằng 2 liên kết hydrogen), vị trí V chắc chắn là nucleotide loại Thymine (T)."
      },
      {
        key: "d",
        text: "Nếu một đoạn DNA có 200 cặp nucleotide, trong đó có 80 cặp A–T, thì tổng số liên kết hydrogen giữa các cặp nitrogenous base của đoạn DNA đó là 520.",
        answer: true,
        explain: "Đoạn DNA có 200 cặp nucleotide, trong đó số cặp A–T = 80 cặp -> Số cặp G–C = 200 - 80 = 120 cặp. Vì mỗi cặp A–T có 2 liên kết hydrogen và mỗi cặp G–C có 3 liên kết hydrogen, nên tổng số liên kết hydrogen là: H = (80 x 2) + (120 x 3) = 160 + 360 = 520 liên kết."
      }
    ]
  },
  {
    id: "dc-p2-5",
    num: 5,
    label: "Câu 5 (gốc Câu 67)",
    prompt: "Hình bên mô tả các giai đoạn của quy trình tạo DNA tái tổ hợp và nhân dòng gene ở vi khuẩn. Dựa vào hình và kiến thức đã học, hãy xác định mỗi phát biểu sau đây là Đúng hay Sai.",
    quote: null,
    image: {
      src: "images/img_09.jpg",
      caption: "Hình câu 5: Quy trình tạo DNA tái tổ hợp và nhân dòng gen"
    },
    statements: [
      {
        key: "a",
        text: "Ở giai đoạn (1), gene ngoại lai được tách từ DNA của tế bào chứa gene cần chuyển.",
        answer: true,
        explain: "Nhìn vào giai đoạn (1) trên hình: Phân tử DNA trong 'Tế bào chứa gene ngoại lai' được tách chiết và cắt bằng enzyme cắt giới hạn (restrictase) để thu lấy đoạn 'Gene ngoại lai' cần chuyển."
      },
      {
        key: "b",
        text: "Plasmid được sử dụng trong hình là phân tử DNA mạch thẳng, có khả năng tồn tại độc lập trong tế bào vi khuẩn.",
        answer: false,
        explain: "Quan sát giai đoạn (2) trên hình vẽ: Plasmid nằm trong tế bào chất của vi khuẩn là một phân tử DNA nhỏ dạng MẠCH VÒNG kép (không phải mạch thẳng), có khả năng tự nhân đôi độc lập với DNA vùng nhân của vi khuẩn."
      },
      {
        key: "c",
        text: "Cấu trúc K chứa gene ngoại lai và DNA plasmid, được hình thành nhờ enzyme DNA ligase nối các đoạn DNA.",
        answer: true,
        explain: "Tại giai đoạn (3), đoạn 'Gene ngoại lai' và 'Plasmid' (đã được cắt mở vòng bởi cùng một loại enzyme cắt giới hạn) được gắn nối lại với nhau nhờ xúc tác của enzyme nối DNA ligase để tạo thành vòng 'Cấu trúc K' (phân tử DNA tái tổ hợp)."
      },
      {
        key: "d",
        text: "Sau giai đoạn (5), tất cả các tế bào vi khuẩn được tạo thành đều chứa cấu trúc K và có khả năng biểu hiện gene ngoại lai.",
        answer: false,
        explain: "Giải thích rõ cả 2 góc độ để đối chiếu đáp án trên lớp:\n+ Xét về bản chất công nghệ gene (Đáp án chuẩn là SAI): Sơ đồ đề bài nêu rõ đây là quy trình 'nhân dòng gene' (tạo nhiều bản sao của gene nhờ sự phân chia của vi khuẩn), việc chứa cấu trúc K không đồng nghĩa với việc tất cả tế bào đều 'có khả năng biểu hiện gene ngoại lai' thành protein có hoạt tính (muốn biểu hiện được cần vector biểu hiện có promoter tương thích); hơn nữa trong nuôi cấy thực tế một số tế bào con có thể bị thất thoát plasmid.\n+ Lưu ý thêm: Nếu giáo viên chỉ xét thuần túy hình ảnh minh họa ở bước (4) -> (5) (từ 1 tế bào vi khuẩn đã biến nạp thành công ở bước 4 phân đôi liên tiếp tạo 4 tế bào con đều vẽ có vòng K) thì có thể chấm ý này là Đúng."
      }
    ]
  },
  {
    id: "dc-p2-6",
    num: 6,
    label: "Câu 6 (gốc Câu 68)",
    prompt: "Dựa vào kiến thức về cấu trúc nhiễm sắc thể kết hợp quan sát hình dưới đây về các bậc cấu trúc của NST ở sinh vật bậc cao. Cho biết mỗi nhận định sau đây là Đúng hay Sai?",
    quote: null,
    image: {
      src: "images/img_08.jpg",
      caption: "Hình câu 6: Các mức cấu trúc siêu hiển vi của NST nhân thực (từ 1 đến 6)"
    },
    statements: [
      {
        key: "a",
        text: "Hai thành phần chủ yếu cấu tạo nên NST là DNA và protein.",
        answer: true,
        explain: "Quan sát chuỗi cấu trúc từ (6) -> (5) -> (1): Nhiễm sắc thể của sinh vật nhân thực được cấu tạo từ 2 thành phần hóa học chủ yếu là phân tử DNA mạch kép (số 6) quấn quanh các khối cầu protein loại histone (số 5)."
      },
      {
        key: "b",
        text: "Các nhà khoa học có thể chủ động sử dụng tác nhân gây đột biến vào cấu trúc số 6 để gây đột biến gene với tần số cao cung cấp nguồn nguyên liệu cho chọn giống.",
        answer: true,
        explain: "Trên hình vẽ, cấu trúc số 6 là phân tử DNA mạch kép (đường kính 2 nm). Vì gene là một đoạn của phân tử DNA nên khi sử dụng các tác nhân vật lí, hóa học tác động vào cấu trúc số 6 (đặc biệt khi DNA đang tháo xoắn tái bản ở pha S) sẽ gây ra đột biến gene với tần số cao phục vụ công tác chọn giống."
      },
      {
        key: "c",
        text: "Quan sát một tế bào rễ hành dưới kính hiển vi, không thể nhìn thấy hình dạng nhiễm sắc thể ở trạng thái kép như trúc số 1.",
        answer: false,
        explain: "Cấu trúc số 1 trên hình là nhiễm sắc thể kép ở kì giữa của quá trình phân bào (đã đóng xoắn cực đại đạt đường kính 1400 nm, mỗi chromatid đạt 700 nm). Khi làm tiêu bản đỉnh sinh trưởng rễ hành đang nguyên phân và quan sát dưới kính hiển vi quang học ở kì giữa, ta HOÀN TOÀN NHÌN THẤY RÕ hình dạng NST kép như cấu trúc số 1 (chỉ các mức cấu trúc siêu hiển vi từ số 2 đến số 6 mới không nhìn thấy được dưới kính hiển vi quang học thường)."
      },
      {
        key: "d",
        text: "Sự vận động của nhiễm sắc thể (tự nhân đôi, phân li, tổ hợp, tái tổ hợp) trong nguyên phân, giảm phân và thụ tinh là cơ sở của sự vận động của gene được thể hiện trong các quy luật di truyền, biến dị tổ hợp và biến dị số lượng nhiễm sắc thể.",
        answer: true,
        explain: "Vì các gene nằm dọc theo chiều dài của nhiễm sắc thể, nên mọi hoạt động tự nhân đôi, phân li đồng đều, tổ hợp tự do hay trao đổi chéo của NST trong phân bào và thụ tinh chính là cơ sở tế bào học quy định sự di truyền của các gene và sự xuất hiện các biến dị."
      }
    ]
  }
];
