package chapter4_yoojimin;
import java.util.Scanner;

public class chapter4_num12 {
	//예약 시스템 메뉴 : 예약, 조희, 취소, 끝내기
	//예약 : 1자리만 가능, 좌석 타입, 예약자 이름, 좌석 번호 순서대로 input
	//조회 : 모든 좌석 출력 (S열, A열, B열)
	//취소 : 예약자 이름 입력 -> 해당 예약자 예약좌석 취소
	
	public static class Reservation {//예약 시스템 클래스
		private String[] S = new String[10];
		private String[] A = new String[10];
		private String[] B = new String[10];
		Scanner scanner = new Scanner(System.in);
		
		public void Initialization() {//초기 좌석 상태
			for(int i=0; i<S.length; i++) {
				S[i] = "---";
				A[i] = "---";
				B[i] = "---";
				}
			}
		public void S_seat() {//S석 seat 조회 및 프린트 시스템
			System.out.print("S>>");
			for(int i=0; i<S.length; i++) {
				System.out.print(" "+S[i]);
				}
			System.out.println();
			}
		
		public void A_seat() {//A석 seat 조회 및 프린트 시스템
			System.out.print("A>>");
			for(int i=0; i<A.length; i++) {
				System.out.print(" "+A[i]);
				}
			System.out.println();
			}
		
		public void B_seat() {//B석 seat 조회 및 프린트 시스템
			System.out.print("B>>");
			for(int i=0; i<B.length; i++) {
				System.out.print(" "+B[i]);
			}
			System.out.println();
			}
		
		public void show() {
			S_seat();
			A_seat();
			B_seat();
			System.out.println("<<<조회를 완료하였습니다.>>>");
			}
		
		public void SeatReservation() {//예약 시스템(한자리만 가능, 좌석 타입 - 예약자 이름 - 좌석번호)
			while(true) {
				System.out.print("좌석구분 S(1), A(2), B(3)>>");
				int num = scanner.nextInt();
				
				switch(num) {
				case 1 :
					S_seat();
					System.out.print("이름>>");
					String S_name = scanner.next();
					
					while(true) {
						System.out.print("번호>>");
						int S_number = scanner.nextInt();
						if(S_number<=0 || S_number>=11) {
							System.out.println("없는 번호입니다. 다시 시도해주세요.");
							}
						else if(S[S_number-1].equals("---")) {
							S[S_number-1] = S_name;
							break;
							}
						else {
							System.out.println("없는 번호입니다. 다시 시도해주세요.");
							}
						}
					break;
					case 2 :
						A_seat();
						System.out.print("이름>>");
						String A_name = scanner.next();
						while(true) {
							System.out.print("번호>>");
							int A_number = scanner.nextInt();
							if(A_number<=0 || A_number>=11) {
								System.out.println("없는 번호입니다. 다시 시도해주세요.");
								}
							else if(A[A_number-1].equals("---")) {
								A[A_number-1] = A_name;
								break;
								}
							else {
								System.out.println("없는 번호입니다. 다시 시도해주세요.");
								}
							}
						break;
						case 3 :
							B_seat();
							System.out.print("이름>>");
							String B_name = scanner.next();
							while(true) {
								System.out.print("번호>>");
								int B_number = scanner.nextInt();
								if(B_number<=0 || B_number>=11) {
									System.out.println("없는 번호입니다. 다시 시도해주세요.");
									}
								else if(B[B_number-1].equals("---")) {
									B[B_number-1] = B_name;
									break;
									}
								else {
									System.out.println("없는 번호입니다. 다시 시도해주세요.");
									}
								}
							break;
							default :
								System.out.println("없는 번호입니다. 다시 입력해주세요.");
								}
				
				if(num>0 && num<4) { break; }
				}
			}
		
		public void SeatCancel() {//취소 시스템 (예약자 이름 입력받아 취소)
			while(true) {
				System.out.print("좌석 S:1, A:2, B:3>>");
				int num = scanner.nextInt();
				
				switch(num) {
				case 1 :
					S_seat();
					while(true) {
						System.out.print("이름>>");
						String S_name = scanner.next();
						
						int i = 0, check = 0;
						for(i = 0; i < 10 ; i++) {
							if(S_name.equals(S[i])) {
								S[i] = "---";
								check = 1;
								break;
								}
							}
						if(i == 10) {
							System.out.println("예약자 명단에 없는 이름입니다. 다시 시도해주세요.");
						}
						
						if(check == 1) { break; }
						
						}
					break;
					
					case 2 :
						A_seat();
						while(true) {
							System.out.print("이름>>");
							String A_name = scanner.next();
							
							int i = 0, check = 0;
							for(i = 0; i < 10 ; i++) {
								if(A_name.equals(A[i])) {
									A[i] = "---";
									check = 1;
									break;
									}
								}
							
							if(i == 10) {
								System.out.println("예약자 명단에 없는 이름입니다. 다시 시도해주세요.");
							}
							
							if(check == 1) { break; }
							
							}
						break;
						
						case 3 :
							B_seat();
							while(true) {
								System.out.print("이름>>");
								String B_name = scanner.next();
								
								int i = 0, check = 0;
								for(i = 0; i < 10 ; i++) {
									if(B_name.equals(B[i])) {
										B[i] = "---";
										check = 1;
										break;
										}
									}
								
								if(i == 10) {
									System.out.println("예약자 명단에 없는 이름입니다. 다시 시도해주세요.");
								}
								
								if(check == 1) { break; }
								
								}
							break;
							
						default : System.out.println("좌석 (S:1, A:2, B:3)을 선택해주세요.");
				}
				
					if(num>0 && num<4) { break; }
					}
				}
		
		public static void main(String[] args) {
			System.out.println("명품콘서트홀 예약 시스템입니다.");
			Scanner scanner = new Scanner(System.in);
			Reservation r = new Reservation();
			r.Initialization();
		
		while(true) {
			System.out.print("예약:1, 조회:2, 취소:3, 끝내기:4>>");
			int system = scanner.nextInt();
			
			switch(system) {
			case 1 ://예약
				r.SeatReservation();
				break;
				
			case 2 ://조희
				r.show();
				break;
				
			case 3 ://취소
				r.SeatCancel();
				break;
				
			case 4 ://끝내기
				break;
				
			default :
				System.out.println("없는 메뉴입니다. 예약:1, 조회:2, 취소:3, 끝내기:4 를 선택해주세요.");
			}
			if(system == 4) { break; }
		}
		scanner.close();
		}

	}

}