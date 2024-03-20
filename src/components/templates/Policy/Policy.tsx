import { MainLayout } from '@Organisms/MainLayout';
import {
    PolicyContainer,
    PolicyContentContainer,
    PolicyContentParagraphContainer,
    PolicyTitleContainer,
} from './Policy.styled';
import { Gap } from '@Styles/App.styled';
import { Text } from '@Atoms/Typography';
import AnswerlogIconLogo from '@Images/logos/answerlog_icon.svg';
import { PatchBundle } from '@Organisms/PatchBundle';

export const Policy = () => {
    return (
        <MainLayout>
            <PolicyContainer>
                <PolicyTitleContainer>
                    <AnswerlogIconLogo width="24px" />
                    <Gap width="4px" />
                    <Text size="h2">앤서록 운영 정책</Text>
                </PolicyTitleContainer>
                <Gap height="16px" />
                <PolicyContentContainer>
                    <PolicyContentParagraphContainer>
                        <Text size="h3">· 개인정보 처리 방침</Text>
                        <br />
                        <Text>
                            {' '}
                            &quot;주식회사 삶의질연구소 &quot;(이하 &quot;회사
                            &quot;)는 &quot;정보통신망 이용 촉진 및 정보보호에
                            관한 법률 &quot;, &quot;개인정보보호법 &quot;,
                            &quot;통신비밀 보호법 &quot;, &quot;전기통신사업법
                            &quot; 및 &quot;전자상거래 등에서의 소비자 보호에
                            관한 법률 &quot; 등 정보통신서비스 제공자가
                            준수하여야 할 관련 법령상의 개인 정보보호 규정을
                            준수하며, 관련 법령에 의거한 개인 정보처리 방침을
                            정하여 이용자 권익 보호에 최선을 다하겠습니다.
                            회사는 이용자의 개인 정보를 [개인 정보의 수집
                            목적]에서 고지한 범위 내에서 사용하며, 이용자의 사전
                            동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로
                            이용자의 개인 정보를 외부에 제공 또는 위탁하지
                            않습니다. 다만, 아래의 경우에는 예외로 합니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            1. 이용자가 사전에 동의한 경우(이용자가 사전에
                            동의한 경우란, 서비스 이용 등을 위하여 이용자가
                            자발적으로 자신의 개인 정보를 제3자에게 제공하는
                            것에 동의하는 것을 의미합니다.)
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. 법령의 규정에 의거하거나, 수사 목적으로 법령에
                            정해진 절차와 방법에 따라 수사기관의 요구가 있는
                            경우
                            <br />
                        </Text>
                        <br />
                        <Text>
                            이러한 경우에도, 회사는 이용자에게 (1) 개인 정보를
                            제공받는 자 (2) 그의 이용목적 (3) 개인 정보의 보유
                            및 이용 기간을 사전에 고지하고 이에 대해
                            명시적·개별적으로 동의를 얻습니다. 이와 같은 모든
                            과정에 있어서 회사는 이용자의 의사에 반하여 추가적인
                            정보를 수집하거나, 동의의 범위를 벗어난 정보를
                            제3자와 공유하지 않습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보 활용처
                            <br />
                        </Text>
                        <br />
                        <Text>
                            앤서록은 아래와 같은 활용 목적을 가지고 이용자 개인
                            정보를 수집합니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            1. 서비스의 기본 기능이나 특화된 기능을 제공
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. 개별적 공지 필요시
                            <br />
                        </Text>
                        <br />
                        <Text>
                            3. 서비스 이용과 관련하여 문의나 분쟁의 해결
                            <br />
                        </Text>
                        <br />
                        <Text>
                            4. 유료 서비스 이용 시 콘텐츠 등의 전송이나
                            배송∙요금 정산
                            <br />
                        </Text>
                        <br />
                        <Text>
                            5. 맞춤형 서비스 제공
                            <br />
                        </Text>
                        <br />
                        <Text>
                            6. 인구통계학적 특성에 따른 서비스 제공
                            <br />
                        </Text>
                        <br />
                        <Text>
                            7. 각종 이벤트나 광고성 정보의 제공
                            <br />
                        </Text>
                        <br />
                        <Text>
                            8. 법령 등에 규정된 의무의 이행
                            <br />
                        </Text>
                        <br />
                        <Text>
                            9. 법령이나 이용 약관에 반하여 여러분에게 피해를 줄
                            수 있는 잘못된 이용행위의 방지
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            수집하는 개인정보
                            <br />
                        </Text>
                        <br />
                        <Text>
                            1. 휴대폰 번호
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. 앱 내 기능을 사용한 내용
                            <br />
                        </Text>
                        <br />
                        <Text>
                            3. 이용자 이름(닉네임)
                            <br />
                        </Text>
                        <br />
                        <Text>
                            4. 단말기 정보(OS, 화면 사이즈, 디바이스 아이디), IP
                            주소, 쿠키 정보
                            <br />
                        </Text>
                        <br />
                        <Text>
                            5. 이름, 휴대폰 번호, 주소와 같은 배송정보
                            <br />
                        </Text>
                        <br />
                        <Text>
                            6. 신용카드 정보, 통신사 정보, 상품권 번호 등 결제에
                            필요한 정보(유료 서비스 이용 시)
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용 목적
                            <br />
                        </Text>
                        <br />
                        <Text>
                            마케팅 및 광고에의 활용 <br />
                        </Text>
                        <br />
                        <Text>
                            신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트
                            및 광고성 정보 전달 및 참여기회 제공 등<br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용하는 개인정보 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (선택) 휴대전화번호, 로그인ID, 성별, 생년월일, 이름,
                            서비스 이용 기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유 기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            원칙: 회원 탈퇴시까지 2. 예외, 회원의 삭제요청이
                            있을 경우 즉시 삭제
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용 목적
                            <br />
                        </Text>
                        <br />
                        <Text>
                            민원사무 처리 <br />
                        </Text>
                        <br />
                        <Text>
                            민원인의 신원 확인, 민원사항 확인 등<br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용하는 개인정보 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (필수) 핸드폰 번호, 성함
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유 기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            소비자 불만 또는 분쟁처리에 관한 기록: 3년
                            (전자상거래 등에서의 소비자 보호에 관한 법률)
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용 목적
                            <br />
                        </Text>
                        <br />
                        <Text>
                            서비스 이용과정에서 자동으로 생성되어 수집되는 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용하는 개인정보 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (필수) 서비스 이용 기록, 접속 로그, IP주소, 쿠키,
                            방문일시,부정이용기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유 기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            통신비밀보호법 시행령 제41조에 따른
                            통신사실확인자료: 3개월 (통신비밀보호법)
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용 목적
                            <br />
                        </Text>
                        <br />
                        <Text>
                            서비스 제공·개선 <br />
                        </Text>
                        <br />
                        <Text>
                            서비스 제공, 서비스 이용정보 통계 및 분석, 서비스
                            제공에 필요한 음성 인식 모델 개선, 인공지능 학습을
                            통한 서비스 개선 및 정확도 향상 등<br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용하는 개인정보 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (필수) 서비스 이용 기록, 접속 로그, 이용자가 회사에
                            위탁하는 통화녹음으로부터 가공 추출한 이용자의 음성
                            및 화상데이터(선택) 생년월일, 성별
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유 기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            원칙: 회원 탈퇴시까지 2. 문답데이터( 음성데이터
                            포함)의 경우 개인식별이 불가능하도록 암호화하여 영구
                            보관
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용 목적
                            <br />
                        </Text>
                        <br />
                        <Text>
                            회원가입 및 관리 <br />
                        </Text>
                        <br />
                        <Text>
                            회원 가입의사 확인, 멤버십 서비스 제공에 따른 본인
                            식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지
                            등
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 수집 이용하는 개인정보 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (필수) 이메일 주소(로그인ID), 휴대전화번호,비밀번호,
                            이름, 생년월일,성별(선택) 프로필 사진
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유 기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            원칙: 회원 탈퇴시까지 2. 부정이용 방지를 위한 정보는
                            회원탈퇴 후 6개월 간 보관
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보를 수집하는 방법
                            <br />
                        </Text>
                        <br />
                        <Text>
                            앤서록은 다음과 같은 방법을 통해 개인정보를
                            수집합니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            1. 회원가입 및 서비스 이용 과정에서 이용자가 개인
                            정보 수집에 대해 동의를 하고 직접 정보를 입력하는
                            경우
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. 거래 과정에서 이용자가 채팅방에 입력하는
                            휴대번호, 계좌번호
                            <br />
                        </Text>
                        <br />
                        <Text>
                            3. 제휴 서비스 또는 단체 등으로부터 개인 정보를
                            제공받은 경우
                            <br />
                        </Text>
                        <br />
                        <Text>
                            4. 고객센터를 통한 상담 과정에서 웹페이지, 메일,
                            팩스, 전화 등온·오프라인에서 진행되는 이벤트/행사 등
                            참여
                            <br />
                        </Text>
                        <br />
                        <Text>
                            서비스 이용 과정에서 이용자로 부터 수집하는 개인정보
                            <br />
                        </Text>
                        <br />
                        <Text>
                            PC 웹, 모바일 웹/앱 이용 과정에서 단말기 정보(OS,
                            화면 사이즈, 디바이스 아이디), IP 주소, 쿠키, 방문
                            일시의 정보가 자동으로 생성되어 수집될 수 있습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인 정보 공유 및 제공
                            <br />
                        </Text>
                        <br />
                        <Text>
                            앤서록은 이용자가 서비스 이용과정 등에서 따로
                            동의하는 경우나 법령에 규정된 경우를 제외하고는
                            이용자 개인 정보를 위에서 말씀드린 목적 범위를
                            초과하여 이용하거나 제3자에게 제공 또는 공유하지
                            않습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보 처리 위탁
                            <br />
                        </Text>
                        <br />
                        <Text>
                            앤서록은 서비스의 원활한 제공을 위해 필요한 때에는
                            개인 정보의 처리를 일부 위탁하고 있으며, 수탁 받은
                            업체가 관계 법령을 준수하도록 관리·감독하고
                            있습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보를 제공 받는 자<br />
                        </Text>
                        <br />
                        <Text>
                            이용자가 등록 또는 소속된 기관(자원봉사센터,
                            행정기관, 복지센터, 지방자치단체 등)및 해당 기관의
                            관리자
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보를 제공 받는 자의 개인정보 이용 목적
                            <br />
                        </Text>
                        <br />
                        <Text>
                            서비스 질 관리 및 사용자 관리, 이용자 사례관리, 민원
                            처리
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 제공 하는 개인정보의 항목
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (필수) 휴대전화번호, 이름, 생년월일, 성별, 서비스
                            이용 기록, 이용자가 회사에 위탁하는 통화
                            녹음으로부터 가공 추출한 이용자의 음성 및
                            화상데이터(선택) 프로필 사진
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보를 제공 받는 자의 개인정보 보유 및
                            이용기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            서비스 종료시까지
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보처리 수탁업체 정보
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보처리 수탁업체
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (주)네이버페이
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 위탁업무 내용
                            <br />
                        </Text>
                        <br />
                        <Text>
                            결제 서비스 제공
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            회원탈퇴 시 또는 위탁 계약 종료 시<br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보처리 수탁업체
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (주) KMC KOREA <br />
                        </Text>
                        <br />
                        <Text>
                            ● 위탁업무 내용
                            <br />
                        </Text>
                        <br />
                        <Text>
                            전자상거래 고객 배송 위탁 서비스
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            회원탈퇴 시 또는 위탁 계약 종료 시<br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보처리 수탁업체
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (주) 대한 베드 <br />
                        </Text>
                        <br />
                        <Text>
                            ● 위탁업무 내용
                            <br />
                        </Text>
                        <br />
                        <Text>
                            전자상거래 고객 배송 위탁 서비스
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            회원탈퇴 시 또는 위탁 계약 종료 시<br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 개인정보처리 수탁업체
                            <br />
                        </Text>
                        <br />
                        <Text>
                            (주) H&C 인터내셔널
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 위탁업무 내용
                            <br />
                        </Text>
                        <br />
                        <Text>
                            3PL 위탁 물류
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 보유기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            회원탈퇴 시 또는 위탁 계약 종료 시<br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보 보유기간, 파기방법 및 이용기간
                            <br />
                        </Text>
                        <br />
                        <Text>
                            이용자 개인 정보는 이용자로부터 동의를 받은 수집 및
                            이용목적이 달성된 때에는 회사 내부 방침 또는 관계
                            법령에서 정한 일정한 기간 동안 보관한 다음
                            파기합니다. 종이에 출력된 개인 정보는 분쇄기로
                            분쇄하거나 소각을 통하여 파기하고, 전자적 파일
                            형태로 저장된 개인 정보는 기록을 재생할 수 없는
                            기술적 방법을 사용하여 삭제합니다. 앤서록이 내부
                            방침 또는 법령에 따라 보관하는 개인 정보 및 해당
                            법령은 아래 표와 같습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            가. 회사 내부 방침에 의한 정보보유 사유
                            <br />
                        </Text>
                        <br />
                        <Text>
                            1. 보존 항목: 부정 이용 기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. 보존 이유: 부정 이용 방지
                            <br />
                        </Text>
                        <br />
                        <Text>
                            3. 보존 기간: 10년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            4. 보존 항목: 판매 게시물 및 채팅 내용
                            <br />
                        </Text>
                        <br />
                        <Text>
                            5. 보존 이유: 거래 관련 사기 방지 및 분쟁 해결
                            <br />
                        </Text>
                        <br />
                        <Text>
                            6. 보존 기간: 5년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            나. 관련 법령에 의한 정보보유 사유
                            <br />
                        </Text>
                        <br />
                        <Text>
                            1. 보존 항목: 계약 또는 청약철회 등에 관한 기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. 근거 법령: 전자상거래 등에서의 소비자보호에 관한
                            법률
                            <br />
                        </Text>
                        <br />
                        <Text>
                            3. 보존 기간: 5년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            4. 보존 항목: 대금 결제 및 재화 등의 공급에 관한
                            기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            5. 근거 법령: 전자상거래 등에서의 소비자보호에 관한
                            법률
                            <br />
                        </Text>
                        <br />
                        <Text>
                            6. 보존 기간: 5년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            7. 보존 항목: 소비자의 불만 또는 분쟁처리에 관한
                            기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            8. 근거 법령: 전자상거래 등에서의 소비자보호에 관한
                            법률
                            <br />
                        </Text>
                        <br />
                        <Text>
                            9. 보존 기간: 3년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            10. 보존 항목: 표시/광고에 관한 기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            11. 근거 법령: 전자상거래 등에서의 소비자보호에 관한
                            법률
                            <br />
                        </Text>
                        <br />
                        <Text>
                            12. 보존 기간: 6개월
                            <br />
                        </Text>
                        <br />
                        <Text>
                            13. 보존 항목: 세법이 규정하는 모든 거래에 관한 장부
                            및 증빙서류
                            <br />
                        </Text>
                        <br />
                        <Text>
                            14. 근거 법령: 국세기본법
                            <br />
                        </Text>
                        <br />
                        <Text>
                            15. 보존 기간: 5년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            16. 보존 항목: 전자금융 거래에 관한 기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            17. 근거 법령: 전자금융거래법
                            <br />
                        </Text>
                        <br />
                        <Text>
                            18. 보존 기간: 5년
                            <br />
                        </Text>
                        <br />
                        <Text>
                            19. 보존 항목: 서비스 방문 기록
                            <br />
                        </Text>
                        <br />
                        <Text>
                            20. 근거 법령: 통신비밀 보호법
                            <br />
                        </Text>
                        <br />
                        <Text>
                            21. 보존 기간: 3개월
                            <br />
                        </Text>
                        <br />
                        <Text>
                            파기 절차
                            <br />
                        </Text>
                        <br />
                        <Text>
                            이용자가 입력한 개인정보는 목적이 달성된 후 별도의
                            DB로 옮겨져(종이는 별도 서류함) 내부 방침 및 기타
                            관련 법령에 따라 일정기간 저장된 후 혹은 즉시
                            파기됩니다. 이 때, DB 또는 별도 서류함으로 옮겨진
                            개인정보는 법령에 의한 경우가 아니고서는 다른
                            목적으로 이용되지 않습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            파기 기한
                            <br />
                        </Text>
                        <br />
                        <Text>
                            이용자의 개인정보는 개인정보의 보유기간이 경과된
                            경우에는 보유기간의 종료일로부터 5일 이내에,
                            개인정보의 수집·이용 목적 달성, 해당 서비스의 폐지,
                            사업의 종료 등 그 개인정보가 불필요하게 되었을
                            때에는 개인정보의 수집·이용이 불필요한 것으로
                            인정되는 날로 파기합니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            파기 방법
                            <br />
                        </Text>
                        <br />
                        <Text>
                            전자적 파일 형태로 저장된 개인정보는 기록을 재생할
                            수 없는 기술적인 방법을 사용하여 파기하고, 종이에
                            출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
                            파기합니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            인터넷 접속정보파일 등 개인정보를 자동으로 수집하는
                            장치의 설치·운영 및 그 거부에 관한 사항
                            <br />
                        </Text>
                        <br />
                        <Text>
                            쿠키란?
                            <br />
                        </Text>
                        <br />
                        <Text>
                            웹사이트를 운영하는데 이용되는 서버가 이용자의
                            브라우저에 보내는 아주 작은 텍스트 파일로서 이용자
                            컴퓨터에 저장됩니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            사용목적?
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인화되고 맞춤화된 서비스를 제공하기 위해서
                            이용자의 정보를 저장하고 수시로 불러오는 쿠키를
                            사용합니다. 이용자가 웹사이트에 방문할 경우 웹
                            사이트 서버는 이용자의 디바이스에 저장되어 있는
                            쿠키의 내용을 읽어 이용자의 환경설정을 유지하고
                            맞춤화된 서비스를 제공하게 됩니다. 쿠키는 이용자가
                            웹 사이트를 방문할 때, 웹 사이트 사용을 설정한대로
                            접속하고 편리하게 사용할 수 있도록 돕습니다. 또한,
                            이용자의 웹사이트 방문 기록, 이용 형태를 통해서
                            최적화된 광고 등 맞춤형 정보를 제공하기 위해
                            활용됩니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            쿠키 수집 거부
                            <br />
                        </Text>
                        <br />
                        <Text>
                            쿠키에는 이름, 전화번호 등 개인을 식별하는 정보를
                            저장하지 않으며, 이용자는 쿠키 설치에 대한 선택권을
                            가지고 있습니다. 따라서, 이용자는 웹 브라우저에서
                            옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가
                            저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을
                            거부할 수도 있습니다. 다만, 쿠키 설치를 거부할 경우
                            웹 사용이 불편해지며, 로그인이 필요한 일부 서비스
                            이용에 어려움이 있을 수 있습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            설정 방법의 예<br />
                        </Text>
                        <br />
                        <Text>
                            1. Internet Explorer의 경우 웹 브라우저 상단의 도구
                            메뉴 &gt; 인터넷 옵션 &gt; 개인정보 &gt; 설정
                            <br />
                        </Text>
                        <br />
                        <Text>
                            2. Chrome의 경우 웹 브라우저 우측의 설정 메뉴 &gt;
                            화면 하단의 고급 설정 표시 &gt; 개인정보의 콘텐츠
                            설정 버튼 &gt; 쿠키
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            이용자 권리 보호
                            <br />
                        </Text>
                        <br />
                        <Text>
                            이용자(만 14세 미만인 경우 법정 대리인)는 언제든지
                            이용자 개인 정보를 조회하거나 수정할 수 있으며
                            수집∙이용에 대한 동의 철회 또는 가입 해지를 요청할
                            수도 있습니다. 보다 구체적으로는 서비스 내 설정
                            기능을 통한 변경, 가입 해지(동의 철회)를 위해서는
                            서비스 내 &quot;계정 탈퇴 &quot;를 클릭하면 되며,
                            운영자에게 이메일이나 별도 게시판으로 문의할 경우도
                            지체 없이 조치하겠습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보 문의처
                            <br />
                        </Text>
                        <br />
                        <Text>
                            사용자가 서비스를 이용하면서 발생하는 모든 개인
                            정보보호 관련 문의, 불만, 조언이나 기타 사항은 개인
                            정보 보호 책임자 및 담당 부서로 연락해 주시기
                            바랍니다. 앤서록은 사용자 목소리에 귀 기울이고
                            신속하고 충분한 답변을 드릴 수 있도록 최선을
                            다하겠습니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보보호 책임자
                            <br />
                        </Text>
                        <br />
                        <Text>
                            성 명 : 조기웅 <br />
                        </Text>
                        <br />
                        <Text>
                            직위 : 대표이사
                            <br />
                        </Text>
                        <br />
                        <Text>
                            소 속: (주)삶의질연구소
                            <br />
                        </Text>
                        <br />
                        <Text>
                            연락처: info@qollabs.care
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            개인정보보호 담당자
                            <br />
                        </Text>
                        <br />
                        <Text>
                            담당자 : 이승현
                            <br />
                        </Text>
                        <br />
                        <Text>
                            직위 : 부대표
                            <br />
                        </Text>
                        <br />
                        <Text>
                            연락처 : info@qollabs.care
                            <br />
                        </Text>
                        <br />
                        <Text>
                            <br />
                        </Text>
                        <br />
                        <Text>
                            고지의 의무
                            <br />
                        </Text>
                        <br />
                        <Text>
                            앤서록은 법률이나 서비스의 변경사항을 반영하기 위한
                            목적 등으로 개인 정보처리 방침을 수정할 수 있습니다.
                            개인 정보처리 방침이 변경되는 경우 앤서록은 변경
                            사항을 게시하며, 변경된 개인 정보처리 방침은 게시한
                            날로부터 7일 후부터 효력이 발생합니다.
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 공고일자: 2022년 12월 02일
                            <br />
                        </Text>
                        <br />
                        <Text>
                            ● 시행일자: 2022년 12월 02일
                            <br />
                        </Text>
                        <br />
                    </PolicyContentParagraphContainer>
                    <Gap height="32px" />
                    <PolicyContentParagraphContainer>
                        <Text size="h3">· 서비스 이용 약관</Text>
                        <Text>
                            주식회사 삶의질연구소의 서비스를 이용해 주셔서
                            감사합니다. 모바일 서비스를 제공하는 앤서록의 아래
                            약관을 읽어주시면 감사드리겠습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            계정
                            <br />
                        </Text>
                        <Text>
                            앤서록는 모바일 서비스 특성상 별다른 비밀번호 없이
                            휴대전화 번호만으로 계정을 생성하실 수 있습니다.
                            다만, 실제 휴대전화의 소유주임을 확인하기 위해서
                            가입 당시 인증 절차를 거치게 됩니다. 또한, 다른
                            모바일 기기에서 서비스 사용을 연속하기 위해서는
                            기존에 가입하고 인증했던 휴대전화 번호로 재인증을
                            해야 합니다. 아래의 경우에는 계정 생성을 승인하지
                            않을 수 있습니다.
                            <br />
                        </Text>

                        <Text>
                            ● 다른 사람의 명의나 휴대전화 번호 등 개인정보를
                            이용하여 계정을 생성하려 한 경우
                            <br />
                        </Text>
                        <Text>
                            ● 동일인이 다수의 계정을 생성하려 한 경우
                            <br />
                        </Text>
                        <Text>
                            ● 계정 생성 시 필요한 정보를 입력하지 않거나 허위
                            정보를 입력한 경우
                            <br />
                        </Text>
                        <Text>
                            ● 앤서록이 과거에 운영원칙 또는 법률 위반 등의
                            정당한 사유로 해당 계정을 삭제 또는 징계한 경우
                            <br />
                        </Text>
                        <Text>
                            ● 사기 정보 모음 사이트나 정부기관 사이트 등에서
                            거래 사기 이력이 있는 휴대전화 번호로 확인된 경우
                            <br />
                        </Text>
                        <Text>
                            계정은 본인만 이용할 수 있고, 다른 사람에게 이용을
                            허락하거나 양도할 수 없습니다. 사용자는 계정과
                            관련된 정보, 즉 프로필 사진이나 별명 등을 수정할 수
                            있습니다. 휴대폰 번호가 바뀐 경우에는 서비스 내 설정
                            메뉴나 고객센터 문의를 통해 새 휴대폰 번호로 인증
                            절차를 걸쳐 수정할 수 있습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>

                        <Text>
                            사용시 주의해야 할 점<br />
                        </Text>
                        <Text>
                            앤서록은 사용자가 아래와 같이 잘못된 방법이나 행위로
                            서비스를 이용할 경우 사용에 대한 제재(이용정지, 강제
                            탈퇴 등)를 가할 수 있습니다.
                            <br />
                        </Text>

                        <Text>
                            ● 잘못된 방법으로 서비스의 제공을 방해하거나
                            앤서록이 안내하는 방법 이외의 다른 방법을 사용하여
                            앤서록 서비스에 접근하는 행위
                            <br />
                        </Text>
                        <Text>
                            ● 다른 이용자의 정보를 무단으로 수집, 이용하거나
                            다른 사람들에게 제공하는 행위
                            <br />
                        </Text>
                        <Text>
                            ● 서비스를 영리나 홍보 목적으로 이용하는 행위
                            <br />
                        </Text>
                        <Text>
                            ● 앤서록의 동의 없이 앤서록 서비스 또는 이에 포함된
                            소프트웨어의 일부를 복사, 수정, 배포, 판매, 양도,
                            대여, 담보 제공하거나 타인에게 그 이용을 허락하는
                            행위
                            <br />
                        </Text>
                        <Text>
                            ● 소프트웨어를 역설계하거나 소스 코드의 추출을
                            시도하는 등 앤서록 서비스를 복제, 분해 또는
                            모방하거나 기타 변형하는 행위
                            <br />
                        </Text>
                        <Text>
                            ● 관련 법령, 앤서록의 모든 약관 또는 정책을 준수하지
                            않는 행위
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>

                        <Text>
                            개인정보 보호 관련
                            <br />
                        </Text>
                        <Text>
                            개인정보는 앤서록 서비스의 원활한 제공을 위하여
                            사용자가 동의한 목적과 범위 내에서만 이용됩니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            게시물의 저작권 보호
                            <br />
                        </Text>

                        <Text>
                            ● 앤서록 서비스 사용자가 서비스 내에 게시한 게시물의
                            저작권은 해당 게시물의 저작자에게 귀속됩니다.
                            <br />
                        </Text>
                        <Text>
                            ● 사용자가 서비스 내에 게시하는 게시물은 검색 결과
                            내지 서비스 및 관련 프로모션, 광고 등에 노출될 수
                            있으며, 해당 노출을 위해 필요한 범위 내에서는 일부
                            수정, 복제, 편집되어 게시될 수 있습니다. 이 경우,
                            앤서록은 저작권법 규정을 준수하며, 사용자는 언제든지
                            고객센터 또는 운영자 문의 기능을 통해 해당 게시물에
                            대해 삭제, 검색 결과 제외, 비공개 등의 조치를 요청할
                            수 있습니다.
                            <br />
                        </Text>
                        <Text>
                            ● 위 2항 이외의 방법으로 사용자의 게시물을
                            이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을
                            통해 사전에 사용자의 동의를 얻어야 합니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>

                        <Text>
                            게시물의 관리
                            <br />
                        </Text>

                        <Text>
                            ● 사용자의 게시물이 &quot;정보통신망법&quot; 및
                            &quot;저작권법&quot;등 관련 법에 위반되는 내용을
                            포함하는 경우, 권리자는 관련 법이 정한 절차에 따라
                            해당 게시물의 게시중단 및 삭제 등을 요청할 수
                            있으며, 앤서록은 관련 법에 따라 조치를 취하여야
                            합니다.
                            <br />
                        </Text>
                        <Text>
                            ● 앤서록은 전항에 따른 권리자의 요청이 없는 경우라도
                            권리침해가 인정될 만한 사유가 있거나 기타 회사 정책
                            및 관련 법에 위반되는 경우에는 관련 법에 따라 해당
                            게시물에 대해 임시 조치(삭제, 노출 제한, 게시중단)
                            등을 취할 수 있습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>

                        <Text>
                            사용권리
                            <br />
                        </Text>
                        <Text>
                            앤서록은 서비스 이용을 위하여 양도 불가능하고 무상의
                            라이선스를 사용자분들에게 제공합니다. 다만, 앤서록
                            상표 및 로고를 사용할 권리를 사용자분들에게 부여하는
                            것은 아닙니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            서비스 고지 및 홍보내용 표시
                            <br />
                        </Text>
                        <Text>
                            앤서록은 서비스 사용자분의 편의를 위해 서비스 이용과
                            관련된 각종 고지 및 기타 앤서록 서비스 홍보를 포함한
                            다양한 정보를 앤서록 서비스에 표시하거나 사용자의
                            휴대폰 문자로 발송할 수 있습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            서비스 중단
                            <br />
                        </Text>
                        <Text>
                            앤서록 서비스는 장비의 유지∙보수를 위한 정기 또는
                            임시 점검 또는 다른 상당한 이유로 앤서록 서비스의
                            제공이 일시 중단될 수 있으며, 이때에는 미리 서비스
                            제공 화면에 공지하겠습니다. 만약, 앤서록으로서도
                            예측할 수 없는 이유로 앤서록 서비스가 중단된 때에는
                            앤서록이 상황을 파악하는 즉시 통지하겠습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            이용계약 해지(서비스 탈퇴)
                            <br />
                        </Text>
                        <Text>
                            사용자가 앤서록 서비스의 이용을 더 이상 원치 않는
                            때에는 언제든지 앤서록 서비스 내 제공되는 메뉴를
                            이용하여 앤서록 서비스 이용계약의 해지 신청을 할 수
                            있으며, 앤서록은 법령이 정하는 바에 따라 신속히
                            처리하겠습니다. 다만, 거래 사기 등의 부정이용 방지를
                            위해 거래를 진행 중이거나 거래 관련 분쟁이 발생한
                            사용자는 이용계약 해지 및 서비스 탈퇴가 특정 기간
                            동안 제한될 수 있습니다. 이용계약이 해지되면 법령 및
                            개인 정보처리 방침에 따라 사용자 정보를 보유하는
                            경우를 제외하고는 사용자 정보나 사용자가 작성한
                            게시물 등 모든 데이터는 삭제됩니다. 다만, 사용자가
                            작성한 게시물이 제3자에 의하여 스크랩 또는 다른 공유
                            기능으로 게시되거나, 사용자가 제3자의 게시물에 댓글,
                            채팅 등 게시물을 추가하는 등의 경우에는 다른
                            이용자의 정상적 서비스 이용을 위하여 필요한 범위
                            내에서 앤서록 서비스 내에 삭제되지 않고 남아 있게
                            됩니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            책임제한
                            <br />
                        </Text>
                        <Text>
                            앤서록은 법령상 허용되는 한도 내에서 앤서록 서비스와
                            관련하여 본 약관에 명시되지 않은 어떠한 구체적인
                            사항에 대한 약정이나 보증을 하지 않습니다. 예를
                            들어, 앤서록은 앤서록 서비스에 속한 콘텐츠, 서비스의
                            특정 기능, 서비스의 이용 가능성에 대하여 어떠한
                            약정이나 보증을 하는 것이 아니며, 앤서록 서비스를
                            있는 그대로 제공할 뿐입니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            손해배상
                            <br />
                        </Text>
                        <Text>
                            앤서록의 과실로 인하여 사용자가 손해를 입게 될 경우
                            앤서록은 법령에 따라 사용자의 손해를 배상하겠습니다.
                            다만, 앤서록은 앤서록 서비스에 접속 또는
                            이용과정에서 발생하는 개인적인 손해, 제3자가
                            불법적으로 앤서록의 서버에 접속하거나 서버를
                            이용함으로써 발생하는 손해, 제3자가 앤서록 서버에
                            대한 전송 또는 앤서록 서버로부터의 전송을
                            방해함으로써 발생하는 손해, 제3자가 악성 프로그램을
                            전송 또는 유포함으로써 발생하는 손해, 전송된
                            데이터의 생략, 누락, 파괴 등으로 발생한 손해,
                            명예훼손 등 제3자가 앤서록 서비스를 이용하는
                            과정에서 사용자에게 발생시킨 손해에 대하여 책임을
                            부담하지 않습니다. 또한 앤서록은 법률상 허용되는
                            한도 내에서 간접 손해, 특별 손해, 결과적 손해,
                            징계적 손해, 및 징벌적 손해에 대한 책임을 부담하지
                            않습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            약관수정
                            <br />
                        </Text>
                        <Text>
                            앤서록은 법률이나 앤서록 서비스의 변경사항을
                            반영하기 위한 목적 등으로 본 약관이나 각 앤서록
                            서비스 고객센터의 앤서록 서비스 이용방법, 해당 안내
                            및 고지 사항을 수정할 수 있습니다. 본 약관이
                            변경되는 경우 앤서록은 변경 사항을 개별 앤서록
                            서비스 초기 화면에 게시하며, 변경된 약관은 게시한
                            날로부터 7일 후부터 효력이 발생합니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            앤서록은 변경된 약관을 게시한 날로부터 효력이
                            발생되는 날까지 약관 변경에 대한 사용자의 의견을
                            기다리겠습니다. 위 기간이 지나도록 사용자의 의견이
                            앤서록에 접수되지 않으면, 사용자가 변경된 약관에
                            따라 서비스를 이용하는 데에 동의하는 것으로
                            보겠습니다. 사용자가 변경된 약관에 동의하지 않는
                            경우 변경된 약관의 적용을 받는 해당 서비스의 제공이
                            더 이상 불가능하게 됩니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            사용자 의견
                            <br />
                        </Text>
                        <Text>
                            앤서록은 사용자의 의견을 소중하게 생각합니다.
                            사용자는 언제든지 서비스 내 앤서록 운영자 문의를
                            통해 의견을 개진할 수 있습니다. 앤서록은 푸시 알림,
                            채팅 방법, 휴대폰 번호 등으로 사용자에게 여러 가지
                            소식을 알려드리며, 사용자 전체에 대한 통지는 앤서록
                            서비스 초기화면 또는 공지사항에 게시함으로써 효력이
                            발생합니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            본 약관은 앤서록과 사용자와의 관계에 적용되며,
                            제3자의 수익권을 발생시키지 않습니다.
                            <br />
                        </Text>
                        <Text>
                            <br />
                        </Text>
                        <Text>
                            사용자가 본 약관을 준수하지 않은 경우에, 앤서록이
                            즉시 조치를 취하지 않더라도 앤서록이 가지고 있는
                            권리를 포기하는 것이 아니며, 본 약관 중 일부 조항의
                            집행이 불가능하게 되더라도 다른 조항에는 영향을
                            미치지 않습니다.
                            <br />
                        </Text>
                        <Text>
                            본 약관 또는 앤서록 서비스와 관련하여서는 대한민국의
                            법률이 적용됩니다.
                            <br />
                        </Text>

                        <Text>
                            ● 공고일자: 2022년 12월 02일
                            <br />
                        </Text>
                        <Text>
                            ● 시행일자: 2022년 12월 02일
                            <br />
                        </Text>
                    </PolicyContentParagraphContainer>
                </PolicyContentContainer>
            </PolicyContainer>

            <PatchBundle />
        </MainLayout>
    );
};