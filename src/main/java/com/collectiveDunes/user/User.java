package com.collectiveDunes.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")

@Entity
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private String password;

  public User(String name, String password) {
    this.name = name;
    this.password = password;
  }

  public Long getId() { return id; }
  public String getName(){ return name; }
  public String getPassword(){ return password; }
}
