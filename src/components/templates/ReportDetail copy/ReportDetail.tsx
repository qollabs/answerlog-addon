export {};

// import React, {
//     useContext,
//     useEffect,
//     useState,
//     useRef,
//     MouseEvent,
// } from 'react';
// import { MainLayout } from '@Organisms/MainLayout';
// import {
//     ReportDetailCardBack,
//     ReportDetailCardFront,
//     ReportDetailContainer,
//     ReportDetailContentContainer,
//     ReportDetailHeaderContainer,
// } from './ReportDetail.styled';
// import { Text } from '@Atoms/Typography';
// import { useRouter } from 'next/router';
// import { useRequest } from '@Hooks/useRequest';
// import { useAsyncEffect } from '@Hooks/useAsyncEffect';
// import {
//     AnswerStatisticType,
//     IReportData,
//     IReportDetail,
//     TouchCoordinateType,
// } from '@Types/types';
// import { dummyReportDetail } from '@Constants/dummyObjects';
// import { LoadingContainer, SpinLoader } from '@Atoms/Loading';
// import { ImageBox } from '@Atoms/ImageBox';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import ReactCardFlip from 'react-card-flip';
// import { BarGraphHorizontal, BarGraphSymmetric } from '@Organisms/Graphs';
// import { Gap } from '@Styles/App.styled';
// import { categoryPicker } from '@Functions/categoryPicker';
// import { TextTag } from '@Molecules/TextTag';
// import { useActionOnTouch } from '@Hooks/useActionOnTouch';

// export interface SortedDataType {
//     sort: string;
//     data: IReportData[];
// }

// export const ReportDetail = () => {
//     const router = useRouter();
//     const { id: questionId } = router.query;
//     const { loading, request } = useRequest();
//     const { actionOnTouchEnd } = useActionOnTouch();

//     const [reportDetail, setReportDetail] =
//         useState<IReportDetail>(dummyReportDetail);
//     const [dataSetsByAge, setDataSetsByAge] = useState<SortedDataType[]>([]);
//     const [myAnswer, setMyAnswer] = useState<string>('');
//     const [isFlipped, setIsFlipped] = useState(false);
//     const [touchStartCoordinate, setTouchStartCoordinate] =
//         useState<TouchCoordinateType>({
//             x: 0,
//             y: 0,
//         });
//     const [activeSlideIndex, setActiveSlideIndex] = useState(0);

//     const reportDetailSlideTouchRef = useRef<HTMLDivElement>(null);

//     // get report data
//     useAsyncEffect(async () => {
//         if (!questionId) return;
//         const resReportDetail = await request({
//             url: `/api/report/${questionId}`,
//             method: 'GET',
//         });
//         if (resReportDetail) {
//             console.log(resReportDetail.data);
//             setReportDetail(resReportDetail.data);
//             // user_answer에 ""이 들어올 수 있다.
//         }
//     }, [questionId]);

//     // get my answer
//     // report data를 가져올 때 같이 가져오므로 필요없다.
//     // useAsyncEffect(async () => {
//     //     if (!questionId) return;
//     //     const resQna = await request({
//     //         url: `/api/user/answered-questions/${questionId}`,
//     //         method: 'GET',
//     //     });
//     //     if (resQna) {
//     //         +setMyAnswer(resQna.data.me.answered_content[0]);
//     //     }
//     // }, [questionId]);

//     // distribute report data by age
//     // [전체, ~39, 40~59, 60~79, 80~ ]
//     useEffect(() => {
//         const allAges: SortedDataType = {
//             sort: '전체',
//             data: reportDetail.answers,
//         };
//         const underThirties: SortedDataType = {
//             sort: '30대 이하',
//             data: reportDetail.answers.filter((answer) => answer.user.age < 40),
//         };
//         const fourtiesFifties: SortedDataType = {
//             sort: '40대, 50대',
//             data: reportDetail.answers.filter(
//                 (answer) => answer.user.age > 39 && answer.user.age < 60,
//             ),
//         };
//         const sixtiesSeventies: SortedDataType = {
//             sort: '60, 70대',
//             data: reportDetail.answers.filter(
//                 (answer) => answer.user.age > 59 && answer.user.age < 80,
//             ),
//         };
//         const overEighties: SortedDataType = {
//             sort: '80대 이상',
//             data: reportDetail.answers.filter((answer) => answer.user.age > 79),
//         };
//         setDataSetsByAge([
//             allAges,
//             underThirties,
//             fourtiesFifties,
//             sixtiesSeventies,
//             overEighties,
//         ]);
//     }, [reportDetail]);

//     // set touch eventListener about scrolling on slide
//     useEffect(() => {
//         const touchElement = reportDetailSlideTouchRef.current;
//         if (touchElement) {
//             touchElement.addEventListener('touchstart', onTouchStartSlide);
//             touchElement.addEventListener('touchmove', onTouchMoveSlide);
//         }

//         return () => {
//             if (touchElement) {
//                 touchElement.removeEventListener(
//                     'touchstart',
//                     onTouchStartSlide,
//                 );
//                 touchElement.removeEventListener('touchmove', onTouchMoveSlide);
//             }
//         };
//     }, [touchStartCoordinate, activeSlideIndex, isFlipped]);

//     const statisticDataOrganizer = (
//         dataSet: IReportData[],
//         options: string[],
//     ) => {
//         let answerStatistics: AnswerStatisticType[] = [];
//         options.forEach((option, i) => {
//             let targetData = dataSet.filter(
//                 (data) => data.answer_content === option,
//             );
//             let count = targetData.length;
//             let answer = option;
//             let targetStatistic: AnswerStatisticType = {
//                 answer,
//                 count,
//             };
//             answerStatistics.push(targetStatistic);
//         });
//         let answerStatisticsSorted = answerStatistics.sort(
//             (a, b) => b.count - a.count,
//         );
//         // 그 외 답변 있는지 체크 후 있으면 삽입
//         let etcStatistic: AnswerStatisticType = {
//             answer: '그 외',
//             count: 0,
//         };
//         dataSet.forEach((data, i) => {
//             let noMatch = options.every(
//                 (option) => option !== data.answer_content,
//             );
//             if (noMatch) {
//                 etcStatistic.count++;
//             }
//         });
//         if (etcStatistic.count > 0) {
//             answerStatisticsSorted.push(etcStatistic);
//         }

//         return answerStatisticsSorted;
//     };

//     const onTouchStartSlide = (e: TouchEvent) => {
//         const touchStart = e.touches[0];
//         const touchStartCoordinateTemp: TouchCoordinateType = {
//             x: touchStart.clientX,
//             y: touchStart.clientY,
//         };
//         setTouchStartCoordinate(touchStartCoordinateTemp);
//     };

//     const onTouchMoveSlide = (e: TouchEvent) => {
//         const touchMove = e.touches[0];
//         const deltaX = touchMove.clientX - touchStartCoordinate.x;
//         const deltaY = touchMove.clientY - touchStartCoordinate.y;
//         const angle =
//             Math.atan(Math.abs(deltaY) / Math.abs(deltaX)) * (180 / Math.PI);
//         if (Math.abs(deltaX) > Math.abs(deltaY)) {
//             // horizontally swiped
//             e.preventDefault();
//         } else if (angle < 60) {
//             // vertically but not dramatically vertically swiped
//             e.preventDefault();
//         } else {
//             // scroll action activated
//             e.stopPropagation();
//         }
//     };

//     const toggleCardFlip = (e: MouseEvent) => {
//         e.stopPropagation();
//         setIsFlipped(!isFlipped);
//     };

//     return (
//         <MainLayout>
//             {loading ? (
//                 <LoadingContainer>
//                     <SpinLoader />
//                 </LoadingContainer>
//             ) : (
//                 // <LoadingContainer>
//                 //     <ImageBox
//                 //         image={
//                 //             categoryPicker(reportDetail.question_category).image
//                 //         }
//                 //     />
//                 //     <Gap height="16px" />
//                 //     <Text>현재 리포트 기능을 업데이트 하고 있어요</Text>
//                 //     <Gap height="8px" />
//                 //     <Text>조만간 더 나아진 모습으로 돌아올게요</Text>
//                 // </LoadingContainer>
//                 <ReportDetailContainer>
//                     <ReportDetailHeaderContainer>
//                         <Text size="h2">{reportDetail.question_title}</Text>
//                         <TextTag category={reportDetail.question_category} />
//                     </ReportDetailHeaderContainer>
//                     <ReportDetailContentContainer>
//                         <Swiper
//                             modules={[Pagination]}
//                             slidesPerView={1.2}
//                             pagination
//                             spaceBetween={26}
//                             centeredSlides
//                             onBeforeSlideChangeStart={() => setIsFlipped(false)}
//                             touchAngle={30}
//                             threshold={20}
//                             onSlideChange={(swiper) =>
//                                 setActiveSlideIndex(swiper.activeIndex)
//                             }
//                         >
//                             {dataSetsByAge.map((dataSet, i) => (
//                                 <SwiperSlide key={dataSet.sort}>
//                                     {/* {({ isActive }) => (
//                                         <ReactCardFlip
//                                             isFlipped={
//                                                 isActive ? isFlipped : false
//                                             }
//                                             containerClassName="report-detail-card-flip"
//                                         >
//                                             <ReportDetailCardFront
//                                                 isActive={isActive}
//                                                 onClick={
//                                                     isActive
//                                                         ? () =>
//                                                               setIsFlipped(true)
//                                                         : () => null
//                                                 }
//                                             >
//                                                 <ImageBox
//                                                     width="100px"
//                                                     height="100px"
//                                                     image={
//                                                         categoryPicker(
//                                                             reportDetail.question_category,
//                                                         ).image
//                                                     }
//                                                     transparent
//                                                 />
//                                                 <Text size="h2" color="orange3">
//                                                     {dataSet.sort}
//                                                 </Text>
//                                             </ReportDetailCardFront>
//                                             <ReportDetailCardBack
//                                                 isActive={isActive}
//                                                 onClick={
//                                                     isActive
//                                                         ? () =>
//                                                               setIsFlipped(
//                                                                   false,
//                                                               )
//                                                         : () => null
//                                                 }
//                                                 ref={
//                                                     activeSlideIndex === i
//                                                         ? reportDetailSlideTouchRef
//                                                         : null
//                                                 }
//                                             >
//                                                 <ImageBox
//                                                     width="100px"
//                                                     height="100px"
//                                                     image={
//                                                         categoryPicker(
//                                                             reportDetail.question_category,
//                                                         ).image
//                                                     }
//                                                     transparent
//                                                 />
//                                                 <Text size="h2" color="white">
//                                                     {dataSet.sort}
//                                                 </Text>
//                                                 <Gap height="32px" />
//                                                 {reportDetail.question_options
//                                                     .length === 2 && (
//                                                     <BarGraphSymmetric
//                                                         data={statisticDataOrganizer(
//                                                             dataSet.data,
//                                                             reportDetail.question_options,
//                                                         )}
//                                                         focus={myAnswer}
//                                                     />
//                                                 )}
//                                                 {reportDetail.question_options
//                                                     .length > 2 && (
//                                                     <BarGraphHorizontal
//                                                         data={statisticDataOrganizer(
//                                                             dataSet.data,
//                                                             reportDetail.question_options,
//                                                         )}
//                                                         focus={myAnswer}
//                                                     />
//                                                 )}
//                                             </ReportDetailCardBack>
//                                         </ReactCardFlip>
//                                     )} */}
//                                     {({ isActive }) => (
//                                         <ReportDetailCardBack
//                                             isActive={isActive}
//                                             // onClick={
//                                             //     isActive
//                                             //         ? () => setIsFlipped(false)
//                                             //         : () => null
//                                             // }
//                                             ref={
//                                                 activeSlideIndex === i
//                                                     ? reportDetailSlideTouchRef
//                                                     : null
//                                             }
//                                         >
//                                             <ImageBox
//                                                 width="100px"
//                                                 height="100px"
//                                                 image={
//                                                     categoryPicker(
//                                                         reportDetail.question_category,
//                                                     ).image
//                                                 }
//                                                 transparent
//                                             />
//                                             <Text size="h2" color="white">
//                                                 {dataSet.sort}
//                                             </Text>
//                                             <Gap height="32px" />
//                                             {reportDetail.question_options
//                                                 .length === 2 && (
//                                                 <BarGraphSymmetric
//                                                     data={statisticDataOrganizer(
//                                                         dataSet.data,
//                                                         reportDetail.question_options,
//                                                     )}
//                                                     focus={myAnswer}
//                                                 />
//                                             )}
//                                             {reportDetail.question_options
//                                                 .length > 2 && (
//                                                 <BarGraphHorizontal
//                                                     data={statisticDataOrganizer(
//                                                         dataSet.data,
//                                                         reportDetail.question_options,
//                                                     )}
//                                                     focus={myAnswer}
//                                                 />
//                                             )}
//                                         </ReportDetailCardBack>
//                                     )}
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </ReportDetailContentContainer>
//                 </ReportDetailContainer>
//             )}
//         </MainLayout>
//     );
// };
