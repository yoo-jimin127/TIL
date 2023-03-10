package chapter3_yoojimin;
import java.util.Scanner;
public class chapter3_num6 {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);

		int [] unit = {50000, 10000, 1000, 500, 100, 50, 10, 1};
		
		System.out.print("금액을 입력하시오>>");
		int money = scanner.nextInt();
		
		for( int exchange : unit ) {
			if ( money/exchange != 0 ) {
				System.out.println(exchange + "원 짜리 : " + money/exchange +"개");
				money = money - (money/exchange*exchange);
			}
		}
		
		scanner.close();
	}
}
