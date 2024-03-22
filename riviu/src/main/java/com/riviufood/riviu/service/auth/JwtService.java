package com.riviufood.riviu.service.auth;

import com.riviufood.riviu.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    private final String SECRET_KEY = "4c65c00dceaa06604bbb08fd02997f1f255c23dff78081106bd4249a49377a4d";

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isValid(String token, UserDetails user){
        String username = extractUsername(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver){
        Claims claims = extractAllClaims(token); // trích xuất tất cả các claims từ token đã được xác thực và phân tích
        /*resolver.apply(claims): Sau đó, hàm sử dụng một đối tượng Function<Claims, T>
        để trích xuất một claim cụ thể từ Claims. Đối tượng Function
        này nhận đối tượng Claims làm đầu vào và trả về một giá trị thuộc kiểu T.
        resolver ở đây là một đối tượng hàm (function), được truyền vào như một tham số,
        có khả năng xử lý một đối tượng Claims và trả về một giá trị của kiểu T.
        Phương thức apply(claims) được gọi để áp dụng hàm resolver
        cho đối tượng Claims đã trích xuất từ token.*/
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser() // tạo 1 đối tượng parser để phân tích jwt
                .verifyWith(getSigninKey()) // để xác thực chữ kí của jwt
                .build() // kết thúc quá trình xác thực
                .parseSignedClaims(token) // phân tích các token và trả về claims đã được kí
                .getPayload(); // trả về phần payload của token
    }
    public String generateToken(User user ){
        String token = Jwts
                .builder() // tạo token
                .subject(user.getUsername()) // định danh người dùng ở đây là username
                .issuedAt(new Date(System.currentTimeMillis())) // thiết lập thời gian token ở ây là millis
                .expiration(new Date(System.currentTimeMillis()+ 24*60*60*1000)) // thời gian hết hạn
                .signWith(getSigninKey()) // được ký bằng cách sử dụng một khóa bí mật (SecretKey) được trả về từ phương thức getSigninKey()
                .compact(); // hoàn thành
        return token;
    }

    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY); // ở đây nhận vào tham số là key mà ta đã lấy 256 và được giải mã từ định dạng BASE64URL sang byte Arrays
        return Keys.hmacShaKeyFor(keyBytes); //để tạo ra một đối tượng SecretKey từ byte array,
    }
}
