package chapter4_yoojimin;
import java.util.Scanner;

public class chapter4_num10 {
	public static class Dictionary {
		private static String[] kor = {"사랑", "아기", "돈", "미래", "희망"};
		private static String[] eng = {"love", "baby", "money", "future", "hope"};
		
		public static String kor2Eng( String word ) {
			for ( int i = 0; i < kor.length; i++ ) {
				if ( word.equals(kor[i]) ) {
					return (word + "은/는 " + eng[i]);
				}
			}
			return (word+ "은/는 저의 사전에 없습니다.");
			}
	}
	
	static class DicApp {
		
		public static void main (String[] args) {
			System.out.println("한영 단어 검색 프로그램입니다.");
			Scanner scanner = new Scanner (System.in);
			
			while ( true ) {
				System.out.print("한글 단어?");
				String kor_input = scanner.next();
				
				if ( kor_input.equals("그만") ) {
					break;
				}
				
				else {
					System.out.println(Dictionary.kor2Eng(kor_input));
				}
			}
			scanner.close();
		}
	}
}
