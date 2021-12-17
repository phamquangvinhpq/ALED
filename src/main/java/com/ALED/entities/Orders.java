package com.ALED.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the order database table.
 * 
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@NamedQuery(name = "Orders.findAll", query = "SELECT o FROM Orders o")
public class Orders implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String bank;

	@Temporal(TemporalType.DATE)
	@Column(name = "create_date")
	private Date createDate;

	private int monny;

	private String mota;

	private int status;

////	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users user;

	// bi-directional many-to-one association to OrderDetail
	@OneToMany(mappedBy = "orders")
	private List<OrderDetail> orderDetails;

}