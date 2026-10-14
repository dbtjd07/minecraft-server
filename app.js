import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 복사해 오신 Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyA60WbVGv2dDnCR8l1-fThkp4cdC1vyRaE",
  authDomain: "minecraft-poke-date.firebaseapp.com",
  projectId: "minecraft-poke-date",
  storageBucket: "minecraft-poke-date.firebasestorage.app",
  messagingSenderId: "489171411729",
  appId: "1:489171411729:web:708d7efa7b94e28ddae2b0",
  measurementId: "G-8K5FY0GTC9"
};

// Firebase 및 Firestore 데이터베이스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 저장소 내 문서 위치 지정 (profiles 저장소의 user1 데이터)
const docRef = doc(db, "profiles", "user1");

// 1. 페이지 접속 시 기존 프로필 데이터 불러오기
async function loadProfile() {
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById("viewName").innerText = data.name || "없음";
            document.getElementById("viewRole").innerText = data.role || "없음";
            document.getElementById("viewBio").innerText = data.bio || "없음";

            document.getElementById("inputName").value = data.name || "";
            document.getElementById("inputRole").value = data.role || "";
            document.getElementById("inputBio").value = data.bio || "";
        } else {
            document.getElementById("viewName").innerText = "등록된 프로필이 없습니다.";
        }
    } catch (error) {
        console.error("데이터 로드 실패:", error);
    }
}

// 2. [프로필 저장하기] 버튼 클릭 시 데이터베이스에 수정 내용 저장
document.getElementById("saveBtn").addEventListener("click", async () => {
    const name = document.getElementById("inputName").value;
    const role = document.getElementById("inputRole").value;
    const bio = document.getElementById("inputBio").value;

    try {
        await setDoc(docRef, { name, role, bio });
        alert("프로필이 성공적으로 저장 및 수정되었습니다!");
        loadProfile(); // 화면 즉시 갱신
    } catch (error) {
        console.error("저장 실패:", error);
        alert("저장 실패! Firestore Database가 생성되어 있는지 확인하세요.");
    }
});

// 실행
loadProfile();