package chapter2_yoojimin;
import java.util.Scanner;
public class no_8 {
	
	public static void main(String[] args) {

		
		System.out.print("두 점 (x1,y1), (x2,y2)를 입력하시오>>");
		Scanner scanner = new Scanner(System.in);
		int x1 = scanner.nextInt();
		int y1 = scanner.nextInt();
		int x2 = scanner.nextInt();
		int y2 = scanner.nextInt();
		
		boolean tf1 = inRect(x1,y1);
		boolean tf2 = inRect(x2,y2);
		
		if(tf1==true || tf2==true) System.out.print("(100,100), (200,200)의 두 점으로 이루어진 직사각형과 충돌합니다.");
		else System.out.print("(100,100), (200,200)의 두 점으로 이루어진 직사각형과 충돌하지 않습니다.");
		
		scanner.close();
	}
	public static boolean inRect(int x, int y) {
		if((x>= 100 & x<=200) && (y>= 100 & y<=200)) return true;
		else return false; }
}
