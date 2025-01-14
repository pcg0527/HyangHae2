import React, { useRef, useState } from "react";
import styles from "./survey2.module.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useEffect } from "react";
import { useAppSelector } from "../../../reducers/hooks";
import { RootState } from "../../../reducers/store";
import { apiSurvey2Brand, brandType, apiSurvey2Perfume, survey2Search } from "../../../api/survey";
import { dataType } from "../../../api/user";
import ResultBox from "./component/resultBox";
import Paging from "./component/paging";
import Surv2PerfumeDetail from "./component/surv2PerfumeDetail";

const Survey2Of1 = () => {
  const [state, setState] = useState<brandType[]>([]);
  const [perfumeDt, setPerfumeData] = useState<dataType & survey2Search>(null);
  const [isValid, setValid] = useState(true);
  const [searchString, setSearch] = useState("");
  const [brand, setBrand] = useState("brand");
  const [isData, setData] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [rstBox, setRstBox] = useState({
    selectId: -1,
    name: "",
    url: "",
  });
  const [isClick, setClick] = useState(false);
  const [pbBarState, setPbBarState] = useState(false);
  const useTotalPags = useRef(0);
  const setPageBar = useRef(false);
  const token = useAppSelector((state: RootState) => state.authReducer.token);
  const perfumeRef = useRef<HTMLInputElement>(null);

  const brandList = state.map((item, idx) => (
    <option key={idx} value={item.brandName}>
      {item.brandName}
    </option>
  ));

  useEffect(() => {
    let isCompleted = false;

    if (token && !isCompleted) {
      (async function get() {
        try {
          const result = await apiSurvey2Brand(token);
          setState(result.data.brandList);

          setData(true);
        } catch (e) {
          setData(false);
        }
      })();
    }
    return () => {
      isCompleted = true;
    };
  }, []);

  useEffect(() => {
    let isCompleted = false;
    (async function get() {
      try {
        const result = await apiSurvey2Perfume(brand, perfumeRef.current.value, pageNum - 1, 9);
        if (!isCompleted) {
          setPerfumeData(result.data);
          setData(true);
        }
      } catch (e) {
        setData(false);
        setPageBar.current = false;
        console.error(e);
      }
    })();
    return () => {
      isCompleted = true;
      setPageBar.current = true;
    };
  }, [pageNum]);

  const onChSelect = (e) => {
    const value = e.target.value;
    value !== "none" ? setValid(false) : setValid(true);
    setBrand(value);
    setData(false);
    setPageBar.current = false;
    perfumeRef.current.value = "";
  };

  // 처음 검색해서 렌더링 되었을 때
  const callApiSearch = async () => {
    if (perfumeRef.current.value === "") {
      setData(false);
      setPageBar.current = false;
      setPbBarState(false);
      return;
    }
    try {
      const result = await apiSurvey2Perfume(brand, perfumeRef.current.value, 0, 9);
      setSearch(perfumeRef.current.value);

      if (result.data.totalPages === 0) {
        setData(false);
        setPageBar.current = false;
        setPbBarState(false);
        return;
      }

      if (result.data.totalPages > 1) {
        setPageNum(1);
        useTotalPags.current = result.data.totalPages;
        setPageBar.current = true;
        setPbBarState(true);
      }

      setData(true);
      setPerfumeData(result.data);
    } catch (e) {
      console.error(e);
    }
  };
  const perfumeList = perfumeDt?.perfumeList?.map((item, idx) => (
    <div style={{ marginTop: "2rem" }}>
      <ResultBox
        key={idx}
        id={item.perfumeId}
        name={item.perfumeName}
        img={item.imgUrl}
        setData={setRstBox}
        setClick={setClick}
      ></ResultBox>
    </div>
  ));

  // pagination 선택했을 때

  return (
    <div className={styles.container}>
      {!isClick ? (
        <Box component="form" noValidate autoComplete="off">
          <div className={styles.innerBox}>
            <FormControl>
              <NativeSelect
                defaultValue={"none"}
                inputProps={{
                  name: "Brand",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => onChSelect(e)}
              >
                <option value={"none"}>brand</option>
                {brandList}
              </NativeSelect>
            </FormControl>
            <TextField
              id="standard-basic"
              defaultValue={searchString}
              style={{
                width: "30rem",
                marginLeft: "2rem",
                marginBottom: "1.6em",
              }}
              label="향수 이름을 영어로 입력해주세요"
              variant="standard"
              disabled={isValid}
              inputRef={perfumeRef}
              onChange={callApiSearch}
            />
          </div>

          <div className={styles.perfumeList}>
            {isData ? perfumeList : <div className={styles.emptyText}>Empty result</div>}
            <div className={styles.pageBar}>
              {setPageBar.current ? (
                <Paging limit={useTotalPags.current} page={pageNum} setPage={setPageNum} />
              ) : null}
            </div>
          </div>
        </Box>
      ) : (
        <Surv2PerfumeDetail
          id={rstBox.selectId}
          name={rstBox.name}
          url={rstBox.url}
          brand={brand}
          setBack={setClick}
        />
      )}
    </div>
  );
};

export default Survey2Of1;
