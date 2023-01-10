import httpStatus from "http-status";
import { useEffect, useState } from "react";
import { getDocument, getMaterial, getMenu } from "services";
import { AppStore, useAppStore } from "stores";
import { Sidebar } from "../src/components";

function Main() {
  const PDF_DOCUMENT = [
    {
      name: "Giới thiệu",
      type: "INTRODUCTION",
      url: "https://khkt-video.s3.ap-southeast-1.amazonaws.com/Introduction_docs.pdf",
    },
    {
      name: "Phổ IR",
      type: "IR",
      url: "https://khkt-video.s3.ap-southeast-1.amazonaws.com/IR_docs.pdf",
    },
    {
      name: "Phổ MS",
      type: "MS",
      url: "https://khkt-video.s3.ap-southeast-1.amazonaws.com/MS_docs.pdf",
    },
    {
      name: "Phổ NMR (13C)",
      type: "NMR_13C",
      url: "https://khkt-video.s3.ap-southeast-1.amazonaws.com/NMR_13C_docs.pdf",
    },
    {
      name: "Phổ NMR (1H)",
      type: "NMR_1H",
      url: "https://khkt-video.s3.ap-southeast-1.amazonaws.com/NMR_H_docs.pdf",
    },
  ];
  const SPECTRUM_REF = [
    {
      name: "Ngân hàng phổ WebBook",
      ref_url: "https://webbook.nist.gov/chemistry/?fbclid=IwAR3DsDLBb7bZWIw8Z-VICWlkXLgT6__5qNoXK-jVqf2NnxtyVNVfw9oSMlE",
    },
    {
      name: "Ngân hàng phổ Sdbs",
      ref_url: "https://sdbs.db.aist.go.jp/sdbs/cgi-bin/direct_frame_top.cgi?fbclid=IwAR3tbVQQqqT517_Rr3CPtzsEH18ZD7EomVSIRvwvcH-Mjvl-34kNFiFqyfA"
    }
  ]
  const DISCUSS_FORM = [
    {
      name: "Form thảo luận",
      ref_url: "https://docs.google.com/forms/d/e/1FAIpQLSfMvRo-ot2K-7j3qgGoBPd2tf_FKFhwGDZSyGYMJcSN-Q8D9w/viewform"
    }
  ]

  const [appStore, updateAppStore] = useAppStore();
  const [menu, setMenu] = useState([]);
  const [material, setMaterial] = useState([]);
  const [content, setContent] = useState({});
  const [showSidebar, setShowSidebar] = useState(true);

  const fetchMenu = async () => {
    const res = await getMenu();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          setMenu([
            {
              name: "Tài liệu tham khảo",
              // id: "document",
              children: PDF_DOCUMENT,
            },
            {
              name: "Video tham khảo",
              // id: "guide",
              children: data,
            },
            {
              name:"Ngân hàng phổ",
              children: SPECTRUM_REF
            },
            {
              name: "Góp ý - Thảo luận",
              children: DISCUSS_FORM
            }
          ]);
          break;
        }
        case httpStatus.NOT_FOUND: {
          break;
        }
        default:
          break;
      }
    }
    return null;
  };
  const fetchMaterial = async () => {
    const res = await getMaterial();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          setMaterial(data);
          break;
        }
        case httpStatus.NOT_FOUND: {
          break;
        }
        default:
          break;
      }
    }
    return null;
  };
  const fetchDocument = async () => {
    const res = await getDocument();
    if (res) {
      switch (res.status) {
        case httpStatus.OK: {
          const { data } = res;
          break;
        }
        case httpStatus.NOT_FOUND: {
          break;
        }
        default:
          break;
      }
    }
    return null;
  };
  useEffect(() => {
    fetchMenu();
    // return () => {};
  }, []);

  useEffect(() => {
    fetchMaterial();
    // return () => {};
  }, []);
  useEffect(() => {
    setContent(appStore.document);
  }, [appStore.document]);

  useEffect(() => {
    // let path = appStore.parentPath;
    // path?.shift();
    // updateAppStore((draft) => {
    //   draft.material.parentPath = path;
    // });
    setContent(
      material
        .filter(
          (item) =>
            item.typeChemical === appStore.material.typeChemical &&
            item.groupName === appStore.material.groupName &&
            item.chemical === appStore.material.chemical &&
            item.typeSpectrum === appStore.material.typeSpectrum
        )
        .shift()
    );
  }, [appStore.material]);

  return (
    <div className="flex lg:pl-72 bg-slate-200">
      <Sidebar nodeList={menu} show={showSidebar} setShow={setShowSidebar} />
      <div className="w-full p-5 min-h-screen flex flex-col justify-between items-center relative">
        <div className=" absolute top-0 left-0 right-0 p-2 bg-white">
          <h1 className="hidden lg:block text-center font-black text-2xl xl:text-3xl uppercase">
            Nghiên cứu ứng dụng chuyển đổi số trong môn Hóa học
          </h1>
          <span
            className="block lg:hidden float-right"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i class="fa-solid fa-bars fa-2x"></i>
          </span>
        </div>
        <div className=" lg:mt-6 w-full">
          <h1 className=" mt-8 lg:hidden block text-center font-black text-2xl xl:text-3xl uppercase">
            Nghiên cứu ứng dụng chuyển đổi số trong môn Hóa học
          </h1>
          <div className="mt-6">
            {!!content?.url ? (
              <>
                <h4 className=" text-left font-black text-2xl">
                  {content?.name}
                </h4>
                <iframe
                  className="w-full h-[calc(100vh-100px)] mt-4"
                  src={content?.url}
                  title="Giới thiệu"
                />
              </>
            ) : !!content?.videoUrl ? (
              <>
                <h4 className=" text-left font-black text-2xl">
                  {appStore?.material?.parentPath
                    ?.concat(appStore?.material?.typeSpectrum)
                    .join(" > ")}
                </h4>
                <video className="mt-4" controls src={content?.videoUrl} />
              </>
            ) : (
              <div className=" text-2xl">
                Hãy chọn nội dung muốn đọc trong sidebar
              </div>
            )}
          </div>
        </div>
        <footer className="mt-4 w-full rounded-lg flex gap-4 p-4 bg-gray-100">
          {/* <a
            className=" text-lg font-semibold hover:text-blue-900"
            href="https://webbook.nist.gov/chemistry/?fbclid=IwAR3DsDLBb7bZWIw8Z-VICWlkXLgT6__5qNoXK-jVqf2NnxtyVNVfw9oSMlE"
            target="_blank"
            rel="noreferrer"
          >
            Ngân hàng phổ Webook
          </a>
          <a
            className=" text-lg font-semibold hover:text-blue-900"
            href="https://sdbs.db.aist.go.jp/sdbs/cgi-bin/direct_frame_top.cgi?fbclid=IwAR3tbVQQqqT517_Rr3CPtzsEH18ZD7EomVSIRvwvcH-Mjvl-34kNFiFqyfA"
            target="_blank"
            rel="noreferrer"
          >
            Ngân hàng phổ Sdbs
          </a> */}
        </footer>
      </div>
    </div>
  );
}

export default Main;
