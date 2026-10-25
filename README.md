1. Why is it dangerous to store passwords in plain text, and how does hashing prevent harm if the database is compromised?

Storing passwords in plain text is dangerous because anyone who accesses the database can read the users' actual passwords. If the database is compromised, attackers could use those passwords to access users' accounts. Password hashing helps protect users by converting passwords into hashes that are not meant to be reversed into the original passwords. In our project, bcryptjs hashes the password before saving it in MongoDB, making it more difficult for attackers to misuse stolen password data.

2. The login endpoint returns the same error for "user not found" and "wrong password." Why is this better than giving specific messages?

Returning the same error message for an incorrect email and an incorrect password helps protect users' privacy. If the system gave different messages, attackers could discover which email addresses have registered accounts. Using the same message, such as "Invalid credentials," makes it harder to identify existing users. This improves the security of the login process.

3. In your own words, what does the middleware do on every protected request, and why is it better than putting token-checking code inside every route handler?

    Authentication middleware checks whether a request contains a valid JWT token before allowing it to access a protected route. If the token is missing, invalid, or expired, the middleware rejects the request. Using middleware is better than repeating the same security code in every route because it makes the application easier to maintain and reduces duplicated code. It also helps ensure that the same authentication checks are applied consistently to protected routes.

4. What is one thing that could still go wrong in this system (e.g., token theft, no HTTPS, weak secrets), and how would you address it in a real application?

   One possible security problem is token theft, where an attacker obtains a user's JWT and uses it to access protected information. To reduce this risk, a real application should use HTTPS to protect data transmitted between the client and server. It should also store tokens securely, keep secrets private, and use appropriate token expiration and revocation strategies. These measures help reduce the risk of unauthorized access.
   
