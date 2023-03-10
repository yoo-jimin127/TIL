package chapter4_yoojimin;
import java.util.Scanner;

public class chapter4_num8 {
	public static class Phone {
		String name;
		String tel;
		
		public Phone ( String name, String tel ) {
			this.name = name;
			this.tel = tel;
		}
	}
	
	public static class PhoneBook {
		public static void main(String[] args) {
			Scanner scanner = new Scanner (System.in);
			System.out.print("인원수>>");
			int total =  scanner.nextInt();
			
			Phone [] obj_phone = new Phone[total];
			
			for ( int i = 0; i < obj_phone.length; i++ ) {
				System.out.print("이름과 전화번호(이름과 번호는 빈 칸 없이 입력)>>");
				
				String name = scanner.next();
				String tel = scanner.next();
				
				obj_phone[i] = new Phone (name, tel);
			}
			
			System.out.println("저장되었습니다...");//이름과 연락처 저장 시스템

			
			while ( true ) {
				System.out.print("검색할 이름>>");
				String findName = scanner.next();
				
				if( findName.equals("그만") ) {
					break;
				}
				
				int i = 0;
				for ( i = 0; i < total; i++ ) {
					if ( (obj_phone[i].name).equals(findName) ) {
						System.out.println(obj_phone[i].name + "의 번호는 " + obj_phone[i].tel + " 입니다.");
						break;
						}
				}
				
				if ( i == total ) {
					System.out.println(findName + " 이 없습니다.");
				}	//연락처 찾기 시스템
			}
			
			scanner.close();
		}
	}
}
